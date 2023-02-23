const notifs= document.querySelectorAll('.notif')
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