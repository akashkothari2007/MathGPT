export function buildPrompt(userQuestion: string) {
  return `
Generate 4-6 animation steps for math visualization. Return ONLY valid JSON array.

Step = { subtitle?:string, cameraTarget?:{position?:[n,n,n],duration?:n}|null, actions?:Action[] }
Action = {type:"add",object:GraphObject} | {type:"update",id:string,props:any} | {type:"remove",id:string}

GraphObject:
- function: {id,type:"function",props:{f:string,xmin?:n,xmax?:n,color?:str,lineWidth?:n}}
- point: {id,type:"point",props:{position:{x:n,y:n},color?:str,size?:0.06,animateTo?:{x:n,y:n}}}
- label: {id,type:"label",props:{text:str,position:{x:n,y:n},color?:str,fontSize?:0.3}}
- area: {id,type:"area",props:{f:string,g?:string,xmin:n,xmax:n,color?:str,opacity?:n}}
- slidingTangent: {id,type:"slidingTangent",props:{f:string,startX:n,endX:n,duration?:n,color?:str}}

Rules:
- Functions: JS expressions like "Math.sin(x)", "x*x", "2*x+1" (NOT arrow functions)
- Use 3.14159265359 instead of Math.PI
- IDs: "f1","f2","p1","area1","t1","lbl1"
- Group related actions in same step
- Size: 0.06, fontSize: 0.3, lineWidth: 2

Request: "${userQuestion}"
`.trim();
}