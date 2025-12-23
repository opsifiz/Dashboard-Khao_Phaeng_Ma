export async function loadData(type){
    const data = await fetch(`data/${type}.json`).then(response => response.json());
    return data.map(p => ({label: p.name_en, value: p.name_en.toLowerCase().replace(/\s+/g, '_')}));
}