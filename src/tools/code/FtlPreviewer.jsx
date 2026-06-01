import { useState, useCallback } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "@/components/ToolInfo";
import useCopy from "../../hooks/useCopy";

//tokenizer

function tokenize(template) {
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
    tokens.push({ type: "text", value: template.slice(i, next) });
    i = next;
  }

  return tokens;
}

function findNext(str, from, needles) {
  let min = str.length;
  for (const needle of needles) {
    const idx = str.indexOf(needle, from);
    if (idx !== -1 && idx < min) min = idx;
  }
  return min;
}

//parser (tokens  to AST

function parse(tokens) {
  let pos = 0;

  function parseBlock(stopAt = []) {
    const nodes = [];
    while (pos < tokens.length) {
      const tok = tokens[pos];

      if (tok.type === "text") {
        nodes.push({ type: "text", value: tok.value });
        pos++;
        continue;
      }

      if (tok.type === "interpolation") {
        nodes.push({ type: "interpolation", expr: tok.expr });
        pos++;
        continue;
      }

      if (tok.type === "directive") {
        const raw = tok.raw;

        //stop conditions
        if (stopAt.some((s) => raw.startsWith(s))) break;

        //<#setting ...> — ignore
        if (raw.startsWith("<#setting")) {
          pos++;
          continue;
        }

        //<#assign var = expr>
        if (raw.startsWith("<#assign")) {
          const inner = raw.slice(8, -1).trim();
          const eqIdx = inner.indexOf("=");
          const varName = inner.slice(0, eqIdx).trim();
          const expr = inner.slice(eqIdx + 1).trim();
          nodes.push({ type: "assign", varName, expr });
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
              //treat as else/if chain
              const elseifCond = next.slice(8, -1).trim();
              pos++;
              const elseifBody = parseBlock(["</#if>", "<#else>"]);
              alternate = [
                {
                  type: "if",
                  condition: elseifCond,
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

          if (pos < tokens.length && tokens[pos].raw === "</#if>") pos++;
          nodes.push({ type: "if", condition, consequent, alternate });
          continue;
        }

        //<#list arr as item>
        if (raw.startsWith("<#list")) {
          const inner = raw.slice(6, -1).trim();
          const asIdx = inner.indexOf(" as ");
          const arrayExpr = inner.slice(0, asIdx).trim();
          const itemName = inner.slice(asIdx + 4).trim();
          pos++;
          const body = parseBlock(["</#list>"]);
          if (pos < tokens.length && tokens[pos].raw === "</#list>") pos++;
          nodes.push({ type: "list", arrayExpr, itemName, body });
          continue;
        }

        //unknown directive skip
        pos++;
      }
    }
    return nodes;
  }

  return parseBlock();
}

//evaluator

function evalExpr(expr, ctx) {
  expr = expr.trim();

  //string literal
  if (
    (expr.startsWith('"') && expr.endsWith('"')) ||
    (expr.startsWith("'") && expr.endsWith("'"))
  ) {
    return expr.slice(1, -1);
  }

  //number literal
  if (/^-?\d+(\.\d+)?$/.test(expr)) return parseFloat(expr);

  //boolean
  if (expr === "true") return true;
  if (expr === "false") return false;

  //default value operator: var!("default") or var!"default" or var!
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
    const defaultVal = defaultMatch[2] !== undefined ? defaultMatch[2] : "";
    try {
      const val = evalExpr(varExpr, ctx);
      if (val === undefined || val === null) return defaultVal;
      return val;
    } catch {
      return defaultVal;
    }
  }

  //?has_content
  if (expr.endsWith("?has_content")) {
    const val = evalExpr(expr.slice(0, -12), ctx);
    return (
      val !== null &&
      val !== undefined &&
      val !== "" &&
      !(Array.isArray(val) && val.length === 0)
    );
  }

  //?size
  if (expr.endsWith("?size")) {
    const val = evalExpr(expr.slice(0, -5), ctx);
    return Array.isArray(val) ? val.length : 0;
  }

  //?upper_case
  if (expr.endsWith("?upper_case")) {
    const val = evalExpr(expr.slice(0, -11), ctx);
    return String(val).toUpperCase();
  }

  //?lower_case
  if (expr.endsWith("?lower_case")) {
    const val = evalExpr(expr.slice(0, -11), ctx);
    return String(val).toLowerCase();
  }

  // ?string["format"] / number formatting
  const numFmtMatch = expr.match(/^(.+)\?string\["([^"]+)"\]$/);
  if (numFmtMatch) {
    const val = evalExpr(numFmtMatch[1], ctx);
    const fmt = numFmtMatch[2];
    if (typeof val === "number") {
      //handle #0.00 style
      const decimals = (fmt.split(".")[1] || "").length;
      return val.toFixed(decimals);
    }
    return String(val);
  }

  //?string (generic)
  if (expr.endsWith("?string")) {
    const val = evalExpr(expr.slice(0, -7), ctx);
    return String(val ?? "");
  }

  // .withSecond(0).withNano(0) etc / date method chains, just return the base value
  if (expr.includes(".withSecond") || expr.includes(".withNano")) {
    const base = expr.split(".withSecond")[0].split(".withNano")[0];
    return evalExpr(base, ctx);
  }

  //?datetime(...)?string[...] — date formatting
  const dateFmtMatch = expr.match(
    /^(.+)\?datetime\("[^"]+"\)\?string\["([^"]+)"\]$/,
  );
  if (dateFmtMatch) {
    const val = evalExpr(dateFmtMatch[1], ctx);
    // Just return the value as-is for preview purposes
    return String(val ?? "");
  }

  //string concatenation with +
  //split on + but not inside quotes or brackets
  const plusParts = splitOnPlus(expr);
  if (plusParts.length > 1) {
    return plusParts.map((p) => evalExpr(p.trim(), ctx)).join("");
  }

  // == comparison
  const eqMatch = expr.match(/^(.+?)\s*==\s*(.+)$/);
  if (eqMatch) {
    const left = evalExpr(eqMatch[1].trim(), ctx);
    const right = evalExpr(eqMatch[2].trim(), ctx);
    return left == right;
  }

  // != comparison
  const neqMatch = expr.match(/^(.+?)\s*!=\s*(.+)$/);
  if (neqMatch) {
    const left = evalExpr(neqMatch[1].trim(), ctx);
    const right = evalExpr(neqMatch[2].trim(), ctx);
    return left != right;
  }

  // ! negation
  if (expr.startsWith("!")) {
    return !evalExpr(expr.slice(1), ctx);
  }

  // && / ||
  if (expr.includes(" && ")) {
    const parts = expr.split(" && ");
    return parts.every((p) => evalExpr(p.trim(), ctx));
  }
  if (expr.includes(" || ")) {
    const parts = expr.split(" || ");
    return parts.some((p) => evalExpr(p.trim(), ctx));
  }

  //array index access: items[0]
  const idxMatch = expr.match(/^([^[]+)\[(\d+)\](.*)$/);
  if (idxMatch) {
    const base = evalExpr(idxMatch[1], ctx);
    const idx = parseInt(idxMatch[2]);
    const rest = idxMatch[3];
    let val = Array.isArray(base) ? base[idx] : undefined;
    if (rest.startsWith(".")) {
      return evalPath(val, rest.slice(1).split("."));
    }
    return val;
  }

  //dot path: a.b.c
  const parts = expr.split(".");
  return evalPath(ctx, parts);
}

function evalPath(obj, parts) {
  let val = obj;
  for (const part of parts) {
    if (val === null || val === undefined) return undefined;
    const idxMatch = part.match(/^([^[]+)\[(\d+)\]$/);
    if (idxMatch) {
      val = val[idxMatch[1]];
      if (Array.isArray(val)) val = val[parseInt(idxMatch[2])];
    } else {
      val = val[part];
    }
  }
  return val; // can be undefined
}

function splitOnPlus(expr) {
  const parts = [];
  let depth = 0;
  let inStr = false;
  let strChar = "";
  let current = "";

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (inStr) {
      current += ch;
      if (ch === strChar) inStr = false;
    } else if (ch === '"' || ch === "'") {
      inStr = true;
      strChar = ch;
      current += ch;
    } else if (ch === "(" || ch === "[") {
      depth++;
      current += ch;
    } else if (ch === ")" || ch === "]") {
      depth--;
      current += ch;
    } else if (ch === "+" && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current) parts.push(current);
  return parts;
}

// renderer (AST to string)

function render(nodes, ctx) {
  let out = "";
  for (const node of nodes) {
    if (node.type === "text") {
      out += node.value;
      continue;
    }

    if (node.type === "interpolation") {
      try {
        const val = evalExpr(node.expr, ctx);
        if (val === undefined) {
          out += `<span style="background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.3);padding:1px 6px;border-radius:3px;font-family:monospace;font-size:0.85em">[UNDEFINED: ${node.expr}]</span>`;
        } else {
          out += val ?? "";
        }
      } catch {
        out += `<span style="background:rgba(239,68,68,0.1);color:#f87171;border:1px solid rgba(239,68,68,0.3);padding:1px 6px;border-radius:3px;font-family:monospace;font-size:0.85em">[ERROR: ${node.expr}]</span>`;
      }
      continue;
    }
    if (node.type === "assign") {
      try {
        ctx[node.varName] = evalExpr(node.expr, ctx);
      } catch {
        ctx[node.varName] = "";
      }
      continue;
    }

    if (node.type === "if") {
      try {
        const cond = evalExpr(node.condition, ctx);
        if (cond) {
          out += render(node.consequent, { ...ctx });
        } else if (node.alternate) {
          out += render(node.alternate, { ...ctx });
        }
      } catch {
        // skip
      }
      continue;
    }

    if (node.type === "list") {
      try {
        const arr = evalExpr(node.arrayExpr, ctx);
        if (Array.isArray(arr)) {
          arr.forEach((item, index) => {
            const itemCtx = {
              ...ctx,
              [node.itemName]: item,
              [`${node.itemName}_index`]: index,
              [`${node.itemName}_has_next`]: index < arr.length - 1,
            };
            out += render(node.body, itemCtx);
          });
        }
      } catch {
        // skip
      }
      continue;
    }
  }
  return out;
}

//main function

function processFTL(template, data) {
  const tokens = tokenize(template);
  const ast = parse(tokens);
  const ctx = { ...data };
  return render(ast, ctx);
}

//default mock dummy data

const DEFAULT_TEMPLATE = `<#assign booking=Root.bands.booking[0].fields />
<#assign ticket=Root.bands.ticket[0].fields />
<#assign passenger=ticket.passenger />

<#assign seatNumber="FREE SEATING">
<#if ticket.seat?has_content>
  <#assign seatNumber=ticket.seat>
</#if>

<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; font-size: 13px; color: #000000; padding: 20px; }
    .h2 { font-size: 16px; font-weight: bold; }
    .h3 { font-size: 13px; font-weight: bold; }
    hr { border: none; border-top: 1px dashed #ffffff; margin: 10px 0; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 6px 4px; }
    .underline td { border-bottom: 1px solid #ccc; }
  </style>
</head>
<body>
  <p><b>Order Number:</b> \${booking.code}</p>

  <hr/>

  <p>STARTING POINT: <span class="h2">\${ticket.pointFrom.nameEN} → \${ticket.pointTo.nameEN}</span></p>
  <p>ROUTE: <span class="h2">\${ticket.routeNameEN}</span></p>
  <p>DATE: <span class="h2">\${ticket.travelDate}</span></p>

  <hr/>

  <table>
    <tr class="underline">
      <td>TICKET NO.</td>
      <td>PRICE</td>
      <td>SEAT</td>
    </tr>
    <tr>
      <td class="h2">\${ticket.serialNumber}</td>
      <td class="h2">\${ticket.price?string["#0.00"]}€</td>
      <td class="h2">\${seatNumber}</td>
    </tr>
  </table>

  <hr/>

  <p>PASSENGER: <span class="h3">\${passenger.lastname} \${passenger.firstname}</span></p>

  <#if passenger.cardNumber?has_content>
    <p>PASSENGER CARD: <span class="h3">\${passenger.cardNumber}</span></p>
  <#else>
    <p>No passenger card</p>
  </#if>

</body>
</html>`;

const DEFAULT_DATA = `{
  "Root": {
    "bands": {
      "booking": [
        {
          "fields": {
            "code": "BK-2024-001",
            "saleDate": "2024-03-15T10:30"
          }
        }
      ],
      "ticket": [
        {
          "fields": {
            "seat": "12A",
            "travelDate": "2024-03-20",
            "travelTime": "08:30",
            "routeNameEN": "HERAKLION - ATHENS",
            "serialNumber": "TK-0045231",
            "price": 35.50,
            "qrCode": "",
            "pointFrom": { "nameEN": "HERAKLION" },
            "pointTo": { "nameEN": "ATHENS" },
            "destinationFrom": null,
            "destinationTo": null,
            "ticketType": {
              "code": "Full",
              "nameEN": "FULL FARE"
            },
            "passenger": {
              "firstname": "John",
              "lastname": "PAPADOPOULOS",
              "cardNumber": "CARD-12345"
            }
          }
        }
      ]
    }
  }
}`;
//component

//tab button style helper
function tabStyle(active) {
  return {
    background: "transparent",
    border: "none",
    borderBottom: active ? "2px solid #F7DF1E" : "2px solid transparent",
    color: active ? "#F7DF1E" : "#555",
    padding: "10px 16px",
    cursor: "pointer",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  };
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid #333",
        overflowX: "auto",
      }}
    >
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={tabStyle(active === key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function FtlPreviewer({ tips, category }) {
  const [template, setTemplate] = useState("");
  const [mockData, setMockData] = useState("");
  const [rendered, setRendered] = useState("");
  const [error, setError] = useState(null);

  //output tabs: preview/html
  const [outputTab, setOutputTab] = useState("preview");

  //mobile input tabs: template/data
  const [inputTab, setInputTab] = useState("template");

  const { copied, copy } = useCopy();

  const handleRender = useCallback(() => {
    setError(null);
    try {
      const data = JSON.parse(mockData);
      const result = processFTL(template, data);
      setRendered(result);
      //switch to output on mobile after render
      setOutputTab("preview");
    } catch (e) {
      setError(e.message);
      setRendered("");
    }
  }, [template, mockData]);

  const handleClear = () => {
    setTemplate("");
    setMockData("{}");
    setRendered("");
    setError(null);
  };

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>FTL Previewer</h1>
          <p>
            Preview FreeMarker templates with mock JSON data locally, no server
            needed.
          </p>
          {rendered && !error && (
            <div
              className="status-badge status-pretty"
              style={{ marginTop: 12, display: "inline-block" }}
            >
              STATUS: <strong>RENDERED</strong>
            </div>
          )}
          {error && (
            <div className="error-badge" style={{ marginTop: 12 }}>
              {error}
            </div>
          )}
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div
          className="tool-textarea"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {/*mobile tabs for input template / data */}
          <TabBar
            tabs={[
              { key: "template", label: "FTL Template" },
              { key: "data", label: "Mock Data (JSON)" },
            ]}
            active={inputTab}
            onChange={setInputTab}
          />

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "12px",
              gap: "8px",
              overflowY: "auto",
            }}
          >
            {inputTab === "template" && (
              <>
                <textarea
                  className="tool-textarea"
                  style={{
                    flex: 1,
                    minHeight: "350px",
                    fontSize: "12px",
                    resize: "vertical",
                    border: "none",
                  }}
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  placeholder="Paste your FTL template here..."
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </>
            )}

            {inputTab === "data" && (
              <>
                <textarea
                  className="tool-textarea"
                  style={{
                    flex: 1,
                    minHeight: "350px",
                    fontSize: "12px",
                    resize: "vertical",
                    border: "none",
                  }}
                  value={mockData}
                  onChange={(e) => setMockData(e.target.value)}
                  placeholder='{ "variable": "value" }'
                  spellCheck={false}
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </>
            )}
          </div>
        </div>
      }
      output={
        <div
          className="tool-textarea"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            overflow: "hidden",
          }}
        >
          {/*output tabs preview / html source */}
          <TabBar
            tabs={[
              { key: "preview", label: "Preview" },
              { key: "html", label: "HTML Source" },
            ]}
            active={outputTab}
            onChange={setOutputTab}
          />

          <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
            {!rendered && !error && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#333",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                Press "Render" to preview your template
              </div>
            )}

            {rendered && outputTab === "preview" && (
              <iframe
                srcDoc={rendered}
                sandbox="allow-scripts"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "350px",
                  border: "none",
                  background: "#ffffff",
                }}
                title="FTL Preview"
              />
            )}

            {rendered && outputTab === "html" && (
              <pre
                style={{
                  margin: 0,
                  padding: "16px",
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  overflowY: "auto",
                }}
              >
                {rendered}
              </pre>
            )}
          </div>
        </div>
      }
      actions={
        <div className="tool-actions">
          <button onClick={handleRender} className="btn btn-primary">
            Render
          </button>
          <button
            onClick={() => copy(rendered)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!rendered}
          >
            {copied ? "Copied" : "Copy HTML"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
          <button onClick={handleClear} className="btn btn-danger">
            Clear <span className="btn-hint">Esc</span>
          </button>
        </div>
      }
    />
  );
}
