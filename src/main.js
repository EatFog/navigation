const $siteList = $('.siteList')
const $newButton = $siteList.find('.newButton')
const websites = localStorage.getItem('websites')
const wObject = JSON.parse(websites)
const hashMap = wObject || [{url:'https://baidu.com',name:'baidu.com'},{url:'https://bilibili.com',name:'bilibili.com'}]
const render= ()=>{
    $siteList.find('li:not(.newButton)').remove()
    hashMap.forEach((node,index)=>{
    const $site = $(`<li>
        <div class="site">
            <div class="logo"><img src="${'https://'+node.name}/favicon.ico" onerror="googleicon(this,'${node.url.replace('http://','').replace('https://','')}')"></div>
            <div class="link">${node.name}</div>
            <div class="close"><svg class="closecontent"><use xlink:href="#icon-close"></use></svg></div>
        </div>
    </li>`).insertBefore($newButton)
    $site.on('click',()=>{
        window.open(node.url,'_self')
    })
    $site.on('click','.close',(e)=>{
        e.stopPropagation()
        hashMap.splice(index,1)
        render()
    })
})}
const simplifyUrl = (url) =>{
    return url.replace('http://','').replace('https://','').replace('www.','').replace(/\/.*/,'')
}

render()
$('.newButton').on('click',()=>{
    let url = window.prompt('输入添加的网址')
    let name = simplifyUrl(url)
    if(url.indexOf('http')!==0){
        url= 'https://'+url
    }
    hashMap.push({url:url,name:name})
    render()
})
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('websites',string)
}