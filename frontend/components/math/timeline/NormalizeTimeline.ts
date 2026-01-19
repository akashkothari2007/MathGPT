import type { Step } from "../types/steps"
import type { Action } from "../types/actions"

// (optional but good) basic safety gate — keeps it minimal
function assertSafeExpr(expr: string) {
  const s = expr.trim()
  // Block a few obvious escape hatches.
  if (/[;{}]|new\s+Function|Function\s*\(|eval\s*\(|import\s*\(|require\s*\(|process\.|globalThis\.|window\.|document\./.test(s)) {
    throw new Error(`Unsafe function expression: ${s}`)
  }
}

export function compileFunction(expr: string): (x: number) => number {
  const trimmed = expr.trim()

  try {
    assertSafeExpr(trimmed)

    // Arrow function string: "(x) => Math.sin(x)"
    if (trimmed.includes("=>")) {
      return new Function(`return (${trimmed})`)() as (x: number) => number
    }

    // Expression string: "Math.sin(x)" or "x*x"
    return new Function("x", `return (${trimmed})`) as unknown as (x: number) => number
  } catch (error) {
    console.error("Failed to compile function:", trimmed)
    throw error
  }
}

function normalizeProps(obj: any): any {
  if (obj == null) return obj

  if (Array.isArray(obj)) return obj.map(normalizeProps)

  if (typeof obj === "object") {
    const out: any = {}
    for (const key in obj) {
      const val = obj[key]

      if (typeof val === "string" && (key === "f" || key === "g")) {
        out[key] = compileFunction(val)
      } else {
        out[key] = normalizeProps(val)
      }
    }
    return out
  }

  return obj
}

function normalizeAction(action: any): any {
  if (!action || typeof action !== "object") return action

  if (action.type === "add" && action.object?.props) {
    return {
      ...action,
      object: { ...action.object, props: normalizeProps(action.object.props) },
    }
  }

  if (action.type === "update" && action.props) {
    return { ...action, props: normalizeProps(action.props) }
  }

  return action
}

export function normalizeSteps(steps: any[]): Step[] {
  return (steps ?? []).map((step) => ({
    ...step,
    actions: (step.actions ?? []).map(normalizeAction),
  })) as Step[]
}