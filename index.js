const readBtn=document.querySelector('.readButton') 
const topNumber=document.querySelector('.up__unreadnum')
const downContainer=document.querySelector('.down')
//GENERACION DINAMICA DE NOTIFICACIONES USANDO CLASES. (SIMULANDO UNA API)
//ESTRUCTURA DE LA CLASE
class Notifications{
    constructor(user, action, reciever, image, message, time, id){
        this.user=user
        this.action= action
        this.reciever=reciever
        this.image=image
        this.message=message
        this.time=time
        this.userId=id
    }
}
//CREACION DE INSTANCIAS
const n1= new Notifications({name:'Mark Webber', avatar:'./assets/images/avatar-mark-webber.webp'}, 'reacted to your recent post', 'My first tournament today!', '', '', '1m ago', 'n1')
const n2= new Notifications({name:'Angela Gray', avatar:'./assets/images/avatar-angela-gray.webp'}, 'followed you', '', '', '', '5m ago', 'n2')
const n3= new Notifications({name:'Jacob Thompson', avatar:'./assets/images/avatar-jacob-thompson.webp'}, 'has joined your group', 'Chess Club', '', '', '1 day ago', 'n3')
const n4= new Notifications({name:'Rizky Hasanuddin', avatar:'./assets/images/avatar-rizky-hasanuddin.webp'}, 'sent you a private message', '', '', 'Hello, thanks for setting up the Chess Club. I&apos;ve been a member for a few weeks now and I&apos;m already having lots of fun and improving my game.', '5 days ago', 'n4')
const n5= new Notifications({name:'Kimberly Smith', avatar:'./assets/images/avatar-kimberly-smith.webp'}, 'commented on your picture', '', './assets/images/image-chess.webp', '', ' 1 week ago', 'n5')
const n6= new Notifications({name:'Nathan Peterson', avatar:'./assets/images/avatar-nathan-peterson.webp'}, 'reacted to your recent post', '5 end-game strategies to increase your win rate', '', '', ' 2 weeks ago', 'n6')
const n7= new Notifications({name:'Anna Kim', avatar:'./assets/images/avatar-anna-kim.webp'}, 'left the group', 'Chess Club', '', '', '2 weeks ago', 'n7')
let notificationsClassList=[n1, n2, n3, n4, n5, n6, n7]

//CREACION DINAMICA DE ELEMENTOS
function createHTML(){
    //vamos a definir diferentes estructuras en funcion de si contiene o no contiene que parametros.
    notificationsClassList.forEach((notificationObject)=>{
        let structure=`<div class="notif" id="${notificationObject.userId}">
                            <img src="${notificationObject.user.avatar}" alt="avatar image" class="notif__avatar userAvatar">
                            <div class="notif__withtime">
                              <div class="notif__textInfo">
                                <a href="#" class="notif__name user textNotif">${notificationObject.user.name}</a>
                                <p class="notif__action textNotif">${notificationObject.action}</p>
                                <a href="#" class="notif__object textNotif">${notificationObject.reciever}</a>
                                <div id="${notificationObject.userId}dot"class="notif__redDot textNotif"></div>
                              </div>
                              <p class="notif__time">${notificationObject.time}</p>
                            </div>
                            <p class="notif__message inactive">${notificationObject.message}</p>
                            <img src="${notificationObject.image}" alt="" class="notif__picture inactive">
                        </div>`;
                        if(notificationObject.message!=''){
                            structure=`<div class="notif messaged" id="${notificationObject.userId}">
                                        <img src="${notificationObject.user.avatar}" alt="avatar image" class="notif__avatar userAvatar">
                                        <div class="notif__withtime">
                                          <div class="notif__textInfo">
                                            <a href="#" class="notif__name user textNotif">${notificationObject.user.name}</a>
                                            <p class="notif__action textNotif">${notificationObject.action}</p>
                                            <a href="#" class="notif__object textNotif">${notificationObject.reciever}</a>
                                            <div id="${notificationObject.userId}dot"class="notif__redDot textNotif"></div>
                                          </div>
                                          <p class="notif__time">${notificationObject.time}</p>
                                        </div>
                                        <p class="notif__message">${notificationObject.message}</p>
                                        <img src="${notificationObject.image}" alt="" class="notif__picture inactive">
                                    </div>`
                        }
                        if(notificationObject.image!=''){
                            structure=`<div class="notif imageInteraction" id="${notificationObject.userId}">
                                        <img src="${notificationObject.user.avatar}" alt="avatar image" class="notif__avatar userAvatar">
                                        <div class="notif__withtime">
                                          <div class="notif__textInfo">
                                            <a href="#" class="notif__name user textNotif">${notificationObject.user.name}</a>
                                            <p class="notif__action textNotif">${notificationObject.action}</p>
                                            <a href="#" class="notif__object textNotif">${notificationObject.reciever}</a>
                                            <div id="${notificationObject.userId}dot"class="notif__redDot textNotif"></div>
                                          </div>
                                          <p class="notif__time">${notificationObject.time}</p>
                                        </div>
                                        <p class="notif__message inactive">${notificationObject.message}</p>
                                        <img src="${notificationObject.image}" alt="" class="notif__picture">
                                    </div>`
                        }
        downContainer.innerHTML+=structure
    })
    const notifs= document.querySelectorAll('.notif')
    const unreadDots= document.querySelectorAll('.notif__redDot')
    listeners(notifs, unreadDots)
}
createHTML()

function listeners(notifs, unreadDots){
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
        howManyUnreads(notifs)
    })
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
            //usar el notif respectivo para cambiar los estados necesarios
            let isRead=element.classList.contains('readed')
            if(!isRead){
                element.classList.add('readed')
            }
            else{
                element.classList.remove('readed')
            }
            howManyUnreads(notifs)
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
}
// CONTAR CUANTOS UNREAD HAY
function howManyUnreads(notifs){
    let unreadedNotifications=0
    notifs.forEach((notif)=>{
        let isRead=notif.classList.contains('readed')
        if(!isRead){
            unreadedNotifications+=1
        }
    })
    topNumber.innerHTML=unreadedNotifications
}
