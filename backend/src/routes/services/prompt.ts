export function buildPrompt(userQuestion: string) {
  return `
You generate animation STEPS for a math visualization engine.

Return ONLY valid JSON. No markdown, no explanation.
Output format: a JSON array of Step objects.

Function fields MUST be JavaScript EXPRESSION STRINGS using Math.*.
Examples: "Math.sin(x)", "x*x", "2*Math.cos(x)+1"
Do NOT output arrow functions. Do NOT output "sin(x)".
All numbers must be plain numbers (no expressions). Use 3.14159265359 instead of Math.PI.

Types:

Step = {
  subtitle?: string,
  cameraTarget?: { position?: [number,number,number], duration?: number } | null,
  actions?: Action[]
}

Action =
  | { type:"add", object: GraphObject }
  | { type:"update", id: string, props: any }
  | { type:"remove", id: string }

GraphObject =
- function:
  { id:string, type:"function", props:{ f:string, xmin?:number, xmax?:number, steps?:number, color?:string, lineWidth?:number, g?:string, animateDuration?:number } }

- point:
  { id:string, type:"point", props:{ position:{x:number,y:number}, color?:string, size?:number, animateTo?:{x:number,y:number}, animateDuration?:number,
    followFunction?:{ f:string, startX:number, endX:number, duration?:number } | null } }

- label:
  { id:string, type:"label", props:{ text:string, position:{x:number,y:number}, color?:string, fontSize?:number } }

- area:
  { id:string, type:"area", props:{ f:string, g?:string, xmin:number, xmax:number, steps?:number, color?:string, opacity?:number,
    animateTo?:{ f?:string, g?:string, xmin?:number, xmax?:number }, animateDuration?:number } }

- slidingTangent:
  { id:string, type:"slidingTangent", props:{ f:string, startX:number, endX:number, duration?:number, xmin?:number, xmax?:number, color?:string, lineWidth?:number } }

Rules:
- Prefer grouping related actions into the same Step (multiple actions allowed).
- Use stable ids: "f1","f2","p1","area1","t1","lbl1".
- For update actions: include ONLY the props that change.
- Keep steps/actions minimal and clean.

User request:
"${userQuestion}"

Return the JSON Step[] now.
`.trim();
}