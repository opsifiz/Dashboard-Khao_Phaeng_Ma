export async function loadData(level){
    try{
        const data = await fetch(`data/${level}.json`).then(response => response.json());
        return data.map(p => ({label: p.name_en, value: p.name_en.toLowerCase().replace(/\s+/g, '_')}));
    }catch(err){
        console.error(err);
        return {};
    }
}