//tokenizer
export function tokenize(template) {
  const tokens = [];
  let i = 0;

  while (i < template.length) {
    //FTL comment <#-- ... -->
    if (template.startsWith("<#--", i)) {
      const end = template.indexOf("-->", i + 4);

      if (end === -1) {
        i++;
        continue;
      }

      i = end + 3;
      continue;
    }

    //FTL directive <#...> or </#...>
    if (template.startsWith("<#", i) || template.startsWith("</#", i)) {
      const end = template.indexOf(">", i);

      if (end === -1) {
        i++;
        continue;
      }

      const raw = template.slice(i, end + 1);

      tokens.push({ type: "directive", raw });
      i = end + 1;
      continue;
    }

    //interpolation ${...}
    if (template.startsWith("${", i)) {
      const end = template.indexOf("}", i + 2);

      if (end === -1) {
        i++;
        continue;
      }

      const expr = template.slice(i + 2, end);

      tokens.push({ type: "interpolation", expr });
      i = end + 1;
      continue;
    }

    //text
    const next = findNext(template, i, ["<#", "</#", "${", "<#--"]);

    tokens.push({
      type: "text",
      value: template.slice(i, next),
    });

    i = next;
  }

  return tokens;
}

export function findNext(str, from, needles) {
  let min = str.length;

  for (const needle of needles) {
    const index = str.indexOf(needle, from);

    if (index !== -1 && index < min) {
      min = index;
    }
  }

  return min;
}

//parser

export function parse(tokens) {
  let pos = 0;

  function parseBlock(stopAt = []) {
    const nodes = [];

    while (pos < tokens.length) {
      const token = tokens[pos];

      if (token.type === "text") {
        nodes.push({
          type: "text",
          value: token.value,
        });

        pos++;
        continue;
      }

      if (token.type === "interpolation") {
        nodes.push({
          type: "interpolation",
          expr: token.expr,
        });

        pos++;
        continue;
      }

      if (token.type === "directive") {
        const raw = token.raw;

        if (stopAt.some((item) => raw.startsWith(item))) {
          break;
        }

        //<#setting ...>
        if (raw.startsWith("<#setting")) {
          pos++;
          continue;
        }

        //<#assign var = expr>
        if (raw.startsWith("<#assign")) {
          const inner = raw.slice(8, -1).trim();
          const equalIndex = inner.indexOf("=");
          const varName = inner.slice(0, equalIndex).trim();
          const expr = inner.slice(equalIndex + 1).trim();

          nodes.push({
            type: "assign",
            varName,
            expr,
          });

          pos++;
          continue;
        }

        //<#if ...>
        if (raw.startsWith("<#if")) {
          const condition = raw.slice(4, -1).trim();

          pos++;

          const consequent = parseBlock(["</#if>", "<#else>", "<#elseif"]);

          let alternate = null;

          if (pos < tokens.length) {
            const next = tokens[pos].raw;

            if (next && next.startsWith("<#else>")) {
              pos++;
              alternate = parseBlock(["</#if>"]);
            } else if (next && next.startsWith("<#elseif")) {
              const elseifCondition = next.slice(8, -1).trim();

              pos++;

              const elseifBody = parseBlock(["</#if>", "<#else>"]);

              alternate = [
                {
                  type: "if",
                  condition: elseifCondition,
                  consequent: elseifBody,
                  alternate: null,
                },
              ];

              if (
                pos < tokens.length &&
                tokens[pos].raw?.startsWith("<#else>")
              ) {
                pos++;
                alternate[0].alternate = parseBlock(["</#if>"]);
              }
            }
          }

          if (pos < tokens.length && tokens[pos].raw === "</#if>") {
            pos++;
          }

          nodes.push({
            type: "if",
            condition,
            consequent,
            alternate,
          });

          continue;
        }

        //<#list arr as item>
        if (raw.startsWith("<#list")) {
          const inner = raw.slice(6, -1).trim();
          const asIndex = inner.indexOf(" as ");
          const arrayExpr = inner.slice(0, asIndex).trim();
          const itemName = inner.slice(asIndex + 4).trim();

          pos++;

          const body = parseBlock(["</#list>"]);

          if (pos < tokens.length && tokens[pos].raw === "</#list>") {
            pos++;
          }

          nodes.push({
            type: "list",
            arrayExpr,
            itemName,
            body,
          });

          continue;
        }

        //unknown directive
        pos++;
      }
    }

    return nodes;
  }

  return parseBlock();
}

//evaluator

export function evalExpr(expr, ctx) {
  expr = expr.trim();

  //string literal
  if (
    (expr.startsWith('"') && expr.endsWith('"')) ||
    (expr.startsWith("'") && expr.endsWith("'"))
  ) {
    return expr.slice(1, -1);
  }

  //number literal
  if (/^-?\d+(\.\d+)?$/.test(expr)) {
    return parseFloat(expr);
  }

  //boolean
  if (expr === "true") return true;
  if (expr === "false") return false;

  //default operator
  const defaultParenMatch = expr.match(/^(.+?)!\("([^"]*)"\)$/);

  const defaultQuoteMatch =
    !defaultParenMatch && expr.match(/^(.+?)!"([^"]*)"$/);

  const defaultEmptyMatch =
    !defaultParenMatch && !defaultQuoteMatch && !/^[!"]/.test(expr)
      ? expr.match(/^(.+?)!$/)
      : null;

  const defaultMatch =
    defaultParenMatch || defaultQuoteMatch || defaultEmptyMatch;

  if (defaultMatch) {
    const varExpr = defaultMatch[1].trim();

    const defaultValue = defaultMatch[2] !== undefined ? defaultMatch[2] : "";

    try {
      const value = evalExpr(varExpr, ctx);

      if (value === undefined || value === null) {
        return defaultValue;
      }

      return value;
    } catch {
      return defaultValue;
    }
  }

  //?has_content
  if (expr.endsWith("?has_content")) {
    const value = evalExpr(expr.slice(0, -12), ctx);

    return (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    );
  }

  //?size
  if (expr.endsWith("?size")) {
    const value = evalExpr(expr.slice(0, -5), ctx);

    return Array.isArray(value) ? value.length : 0;
  }

  //?upper_case
  if (expr.endsWith("?upper_case")) {
    const value = evalExpr(expr.slice(0, -11), ctx);

    return String(value).toUpperCase();
  }

  //?lower_case
  if (expr.endsWith("?lower_case")) {
    const value = evalExpr(expr.slice(0, -11), ctx);

    return String(value).toLowerCase();
  }

  //?string["format"]
  const numberFormatMatch = expr.match(/^(.+)\?string\["([^"]+)"\]$/);

  if (numberFormatMatch) {
    const value = evalExpr(numberFormatMatch[1], ctx);
    const format = numberFormatMatch[2];

    if (typeof value === "number") {
      const decimals = (format.split(".")[1] || "").length;

      return value.toFixed(decimals);
    }

    return String(value);
  }

  //?string
  if (expr.endsWith("?string")) {
    const value = evalExpr(expr.slice(0, -7), ctx);

    return String(value ?? "");
  }

  //.withSecond(0).withNano(0)
  if (expr.includes(".withSecond") || expr.includes(".withNano")) {
    const base = expr.split(".withSecond")[0].split(".withNano")[0];

    return evalExpr(base, ctx);
  }

  //?datetime(...)?string[...]
  const dateFormatMatch = expr.match(
    /^(.+)\?datetime\("[^"]+"\)\?string\["([^"]+)"\]$/,
  );

  if (dateFormatMatch) {
    const value = evalExpr(dateFormatMatch[1], ctx);

    return String(value ?? "");
  }

  //string concatenation
  const plusParts = splitOnPlus(expr);

  if (plusParts.length > 1) {
    return plusParts.map((part) => evalExpr(part.trim(), ctx)).join("");
  }

  //==
  const equalMatch = expr.match(/^(.+?)\s*==\s*(.+)$/);

  if (equalMatch) {
    const left = evalExpr(equalMatch[1].trim(), ctx);
    const right = evalExpr(equalMatch[2].trim(), ctx);

    return left == right;
  }

  //!=
  const notEqualMatch = expr.match(/^(.+?)\s*!=\s*(.+)$/);

  if (notEqualMatch) {
    const left = evalExpr(notEqualMatch[1].trim(), ctx);
    const right = evalExpr(notEqualMatch[2].trim(), ctx);

    return left != right;
  }

  //!
  if (expr.startsWith("!")) {
    return !evalExpr(expr.slice(1), ctx);
  }

  //&&
  if (expr.includes(" && ")) {
    const parts = expr.split(" && ");

    return parts.every((part) => evalExpr(part.trim(), ctx));
  }

  //||
  if (expr.includes(" || ")) {
    const parts = expr.split(" || ");

    return parts.some((part) => evalExpr(part.trim(), ctx));
  }

  //array index access
  const indexMatch = expr.match(/^([^[]+)\[(\d+)\](.*)$/);

  if (indexMatch) {
    const base = evalExpr(indexMatch[1], ctx);
    const index = parseInt(indexMatch[2]);
    const rest = indexMatch[3];

    let value = Array.isArray(base) ? base[index] : undefined;

    if (rest.startsWith(".")) {
      return evalPath(value, rest.slice(1).split("."));
    }

    return value;
  }

  //dot path
  const parts = expr.split(".");

  return evalPath(ctx, parts);
}

export function evalPath(obj, parts) {
  let value = obj;

  for (const part of parts) {
    if (value === null || value === undefined) {
      return undefined;
    }

    const indexMatch = part.match(/^([^[]+)\[(\d+)\]$/);

    if (indexMatch) {
      value = value[indexMatch[1]];

      if (Array.isArray(value)) {
        value = value[parseInt(indexMatch[2])];
      }
    } else {
      value = value[part];
    }
  }

  return value;
}

export function splitOnPlus(expr) {
  const parts = [];

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let current = "";

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (inString) {
      current += char;

      if (char === stringChar) {
        inString = false;
      }
    } else if (char === '"' || char === "'") {
      inString = true;
      stringChar = char;
      current += char;
    } else if (char === "(" || char === "[") {
      depth++;
      current += char;
    } else if (char === ")" || char === "]") {
      depth--;
      current += char;
    } else if (char === "+" && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

//renderer

export function render(nodes, ctx) {
  let output = "";

  for (const node of nodes) {
    if (node.type === "text") {
      output += node.value;
      continue;
    }

    if (node.type === "interpolation") {
      try {
        const value = evalExpr(node.expr, ctx);

        if (value === undefined) {
          output += `<span style="background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.3);padding:1px 6px;border-radius:3px;font-family:monospace;font-size:0.85em">[UNDEFINED: ${node.expr}]</span>`;
        } else {
          output += value ?? "";
        }
      } catch {
        output += `<span style="background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.3);padding:1px 6px;border-radius:3px;font-family:monospace;font-size:0.85em">[ERROR: ${node.expr}]</span>`;
      }

      continue;
    }

    if (node.type === "assign") {
      try {
        ctx[node.varName] = evalExpr(node.expr, ctx);
      } catch {
        output += `<span class="ftl-render-error">[RENDER ERROR: ${node.type}]</span>`;
      }

      continue;
    }

    if (node.type === "if") {
      try {
        const condition = evalExpr(node.condition, ctx);

        if (condition) {
          output += render(node.consequent, {
            ...ctx,
          });
        } else if (node.alternate) {
          output += render(node.alternate, {
            ...ctx,
          });
        }
      } catch {
        output += `<span class="ftl-render-error">[RENDER ERROR: ${node.type}]</span>`;
      }

      continue;
    }

    if (node.type === "list") {
      try {
        const array = evalExpr(node.arrayExpr, ctx);

        if (Array.isArray(array)) {
          array.forEach((item, index) => {
            const itemContext = {
              ...ctx,
              [node.itemName]: item,
              [`${node.itemName}_index`]: index,
              [`${node.itemName}_has_next`]: index < array.length - 1,
            };

            output += render(node.body, itemContext);
          });
        }
      } catch {
        output += `<span class="ftl-render-error">[RENDER ERROR: ${node.type}]</span>`;
      }

      continue;
    }
  }

  return output;
}

//main function

export function processFTL(template, data) {
  const tokens = tokenize(template);
  const ast = parse(tokens);
  const ctx = { ...data };

  return render(ast, ctx);
}
