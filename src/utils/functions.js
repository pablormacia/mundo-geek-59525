export const calculate_total_price = (items) =>{
    //console.log(items)
    /*Recibe un array de objetos, donde cada uno tiene una propiedad price y quantity
    Devuelve el precio total*/
    return items.reduce((acc, item)=>(acc+=item.price*item.quantity),0)
}