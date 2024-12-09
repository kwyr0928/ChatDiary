//本番では消す
export function add(a: number, b:number){
  const res = a+b;
  if(res==0) throw new Error("0だよ");
  return res;
}
