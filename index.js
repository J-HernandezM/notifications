const notifs= document.querySelectorAll('.notif')
const unreadDots= document.querySelectorAll('.notif__redDot')
const readBtn=document.querySelector('.readButton') 

// LOGICA PARA APAGAR TODOS DE UNA SOLA VEZ!
readBtn.addEventListener('click', ()=>{
    notifs.forEach((notif)=>{
        let isRead= notif.classList.contains('readed')
        if(!isRead){
            notif.classList.toggle('readed')
        }
    })
    unreadDots.forEach((dot)=>{
        let isntDotted=dot.classList.contains('inactive')
        if(!isntDotted){
            dot.classList.toggle('inactive')
        }
    })
})