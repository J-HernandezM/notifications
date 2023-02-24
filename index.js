const notifs= document.querySelectorAll('.notif')
const texts=document.querySelectorAll('.textNotif')
const unreadDots= document.querySelectorAll('.notif__redDot')
const readBtn=document.querySelector('.readButton') 
const topNumber=document.querySelector('.up__unreadnum')

// LOGICA PARA APAGAR TODOS DE UNA SOLA VEZ!
readBtn.addEventListener('click', ()=>{
    notifs.forEach((notif)=>{
        let isRead= notif.classList.contains('readed')
        if(!isRead){
            notif.classList.add('readed')
        }
    })
    unreadDots.forEach((dot)=>{
        let isntDotted=dot.classList.contains('inactive')
        if(!isntDotted){
            dot.classList.add('inactive')
        }
    })
    howManyUnreads()
})
// CONTAR CUANTOS UNREAD HAY
function howManyUnreads(){
    let unreadedNotifications=0
    notifs.forEach((notif)=>{
        let isRead=notif.classList.contains('readed')
        if(!isRead){
            unreadedNotifications+=1
        }
    })
    topNumber.innerHTML=unreadedNotifications
}
//CAMBIAR UNO A LA VEZ
notifs.forEach((notif)=>{
    notif.addEventListener('click', (selectedObject)=>{
        let element
        let currentParent
        let containsNotifClass=selectedObject.target.classList.contains('notif')
        //identificar segun lo que haya dado click el notif respectivo
        if(!containsNotifClass){
            currentParent=selectedObject.target.parentElement
            let isParentNotif=currentParent.classList.contains('notif')
            while(!isParentNotif){
                currentParent=currentParent.parentElement
                isParentNotif=currentParent.classList.contains('notif')
            }
            element=currentParent
        }
        else{
            element=selectedObject.target
        }
        //usar el notif srespectivo para cambiar los estados necesarios
        let isRead=element.classList.contains('readed')
        if(!isRead){
            element.classList.add('readed')
        }
        else{
            element.classList.remove('readed')
        }
        howManyUnreads()
        unreadDots.forEach((dot)=>{
            //encontrar el dot que hace match con el notif seleccionado
            if(dot.id==`${element.id}dot`){
                let isntDotted=dot.classList.contains('inactive')
                if(!isntDotted){
                    dot.classList.add('inactive')
                }
                else{
                    dot.classList.remove('inactive')
                }
            }
        })
    })  
})