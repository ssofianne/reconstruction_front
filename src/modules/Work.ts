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

export const getWorkByName = async (work_title = ''): Promise<WorkResult> =>{
    return fetch(`/works/?work_title=${encodeURIComponent(work_title)}`)
        .then((response) => response.json())
        .catch(()=> ({ resultCount:0, results:[] }))
}