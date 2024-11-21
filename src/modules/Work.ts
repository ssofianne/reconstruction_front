export interface Work {
    id:number;
    imageurl:string;
    title:string;
    price:number;
    description:string;
  }

export interface WorkResult {
  resultCount: number
  results: Work[]
}

export const getWorkByName = async (name = ''): Promise<WorkResult> =>{
    return fetch(`http://127.0.0.1:8000/works/?work_title=${name}`)
        .then((response) => response.json())
        .catch(()=> ({ resultCount:0, results:[] }))
}