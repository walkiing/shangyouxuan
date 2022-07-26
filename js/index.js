// @ts-nocheck

window.onload = () => {
    let bigImgIndex = 0
    // 路径导航的数据渲染
    const navPathDataBind = () => {
        const navPath = document.querySelector('#wrapper #content .contentMain .navPath')
        const path = goodData.path
        for (let i = 0; i < path.length; i++) {
            if (i === path.length - 1) {
                let aNode = document.createElement('a')
                aNode.innerText = path[i].title
                navPath.appendChild(aNode)
            }
            else {
                let aNode = document.createElement('a')
                aNode.href = path[i].url
                aNode.innerText = path[i].title
                let iNode = document.createElement('i')
                iNode.innerText = '/'
                navPath.appendChild(aNode)
                navPath.appendChild(iNode)
            }
        }
    }
    navPathDataBind()
    // 放大镜的移入、移出效果
    const bigClassBind = () => {
        const smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
        const leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')
        const imagessrc = goodData.imagessrc
        // 移入效果
        smallPic.onmouseenter = () => {
            const maskDiv = document.createElement('div')
            maskDiv.className = 'mask'
            const bigPic = document.createElement('div')
            bigPic.id = 'bigPic'
            const bigImg = document.createElement('img')
            bigImg.src = imagessrc[bigImgIndex].b
            bigPic.appendChild(bigImg)
            smallPic.appendChild(maskDiv)
            leftTop.appendChild(bigPic)
            // 移动事件
            smallPic.addEventListener('mousemove', () => {
                let left = event.clientX - smallPic.getBoundingClientRect().left - (maskDiv.offsetWidth / 2)
                let top = event.clientY - smallPic.getBoundingClientRect().top - (maskDiv.offsetHeight / 2)
                if (left < 0) {
                    left = 0
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth
                }
                if (top < 0) {
                    top = 0
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight
                }
                maskDiv.style.left = left + 'px'
                maskDiv.style.top = top + 'px'

                let scale = ((smallPic.clientWidth - maskDiv.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth))
                bigImg.style.left = -(left / scale) + 'px'
                bigImg.style.top = -(top / scale) + 'px'
            })
            // 移出效果
            smallPic.onmouseleave = () => {
                smallPic.removeChild(maskDiv)
                leftTop.removeChild(bigPic)
            }

        }

    }
    bigClassBind()
    // 动态渲染放大镜缩略图的数据
    const thumbnailData = () => {
        const ul = document.querySelector('#wrapper #content .contentMain #center #left #leftbottom #piclist ul ')
        const imagessrc = goodData.imagessrc
        for (let i = 0; i < imagessrc.length; i++) {
            const newLi = document.createElement('li')
            const newImg = document.createElement('img')
            newImg.src = imagessrc[i].s
            newLi.appendChild(newImg)
            ul.appendChild(newLi)
        }
    }
    thumbnailData()
    // 点击缩略图的效果
    const thumbnailClick = () => {
        const liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftbottom #piclist ul li')
        const smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img')
        const imagessrc = goodData.imagessrc
        smallPic_img.src = imagessrc[0].s
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].index = i
            liNodes[i].onclick = () => {
                let idx = liNodes[i].index
                bigImgIndex = idx
                smallPic_img.src = imagessrc[idx].s
            }
        }
    }
    thumbnailClick()
    // 缩略图箭头效果
    const thumbnailLeftRightClick = () => {
        const prev = document.querySelector('#wrapper #content .contentMain #center #left #leftbottom a.prev')
        const next = document.querySelector('#wrapper #content .contentMain #center #left #leftbottom a.next')
        const ul = document.querySelector('#wrapper #content .contentMain #center #left #leftbottom #piclist ul')
        const liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftbottom #piclist ul li')
        let start = 0
        let step = (liNodes[0].offsetWidth)
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth)
        prev.onclick = () => {
            start -= step
            if (start < 0) {
                start = 0
            }
            ul.style.left = -start + 'px'
        }
        next.onclick = () => {
            start += step
            if (start > endPosition) {
                start = endPosition
            }
            ul.style.left = -start + 'px'
        }
    }
    thumbnailLeftRightClick()
    // 商品详情的动态渲染
    const rightTopData = () => {
        const rightTop = document.querySelector('#wrapper #content .contentMain #center #right .rightTop')
        const goodsDetail = goodData.goodsDetail
        const s = `<h3>${goodsDetail.title}</h3>
                    <p>${goodsDetail.recommend}</p>
                    <div class="priceWrap">
                        <div class="priceTop">
                            <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                            <div class="price">
                                <span>￥</span>
                                <p>${goodsDetail.price}</p>
                                <i>降价通知</i>
                            </div>
                            <p>
                                <span>累计评价</span>
                                <span>${goodsDetail.evaluateNum}</span>
                            </p>
                        </div>
                        <div class="priceBottom">
                            <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                            <p>
                                <span>${goodsDetail.promoteSales.type}</span>
                                <span>${goodsDetail.promoteSales.content}</span>
                            </p>
                        </div>
                    </div>
                    <div class="support">
                        <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                        <p>${goodsDetail.support}</p>
                    </div>
                    <div class="address">
                        <span>配&nbsp;送&nbsp;至</span>
                        <p>${goodsDetail.address}</p>
                    </div>`
        rightTop.innerHTML = s
    }
    rightTopData()
    // 商品参数的动态渲染
    const rightBottomData = () => {
        const chooseWrap = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap')
        const crumbData = goodData.goodsDetail.crumbData
        for (let i = 0; i < crumbData.length; i++) {
            const dlNode = document.createElement('dl')
            const dtNode = document.createElement('dt')
            dtNode.innerHTML = crumbData[i].title
            dlNode.appendChild(dtNode)
            chooseWrap.appendChild(dlNode)
            for (let j = 0; j < crumbData[i].data.length; j++) {
                const ddNode = document.createElement('dd')
                ddNode.innerHTML = crumbData[i].data[j].type
                ddNode.setAttribute('price',crumbData[i].data[j].changePrice)
                dlNode.appendChild(ddNode)
            }
        }
    }
    rightBottomData()
    // 点击商品参数之后的颜色排他效果
    const clickddBind = () => {
        const choose = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .choose')
        const dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl')
        let arr = new Array(dlNodes.length)
        arr.fill(0)
        for (let i = 0; i < dlNodes.length; i++) {
            const ddNodes = dlNodes[i].querySelectorAll('dd')
            for (let j = 0; j < ddNodes.length; j++) {
                ddNodes[j].onclick = () => {
                    choose.innerHTML = ''
                    for (let k = 0; k < ddNodes.length; k++) {
                        ddNodes[k].style.color = '#666'
                    }
                    ddNodes[j].style.color = 'red'
                    // 点击dd元素产生新的mark标记元素
                    arr[i] = ddNodes[j]
                    changePriceBind(arr)
                    arr.forEach((value,index) => {
                        if (value) {
                            const mark = document.createElement('div')
                            mark.className = 'mark' 
                            mark.innerText = value.innerText
                            const aNode = document.createElement('a')
                            aNode.innerText = 'X'
                            aNode.setAttribute('index',index)
                            mark.appendChild(aNode)
                            choose.appendChild(mark)
                        }
                    })
                    const aNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .choose .mark a')
                    for (let n = 0; n < aNodes.length; n++) {
                        aNodes[n].onclick=() => {
                            let idx1 = aNodes[n].getAttribute('index')
                            arr[idx1]= 0
                            const ddlist = dlNodes[idx1].querySelectorAll('dd')
                            for (let m = 0; m < ddlist.length; m++) {
                                ddlist[m].style.color = '#666'
                            }
                            ddlist[0].style.color = 'red'
                            choose.removeChild(aNodes[n].parentNode)
                            changePriceBind(arr)
                        }
                    }
                }

            }
        }

    }
    clickddBind()
    // 价格变动的函数声明
    const changePriceBind =(arr) => {
        let oldPrice = document.querySelector('#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p')
        let price = goodData.goodsDetail.price
        for (let i = 0; i < arr.length; i++) {
            if(arr[i]){
                let changePrice = Number(arr[i].getAttribute('price'))
                price += changePrice
            }
        }
        oldPrice.innerText = price
        let leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
        leftPrice.innerText = '￥'+price
        const ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input ')
        let rightPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')
        for (let j = 0; j < ipts.length; j++) {
            if(ipts[j].checked){
                price += parseInt(ipts[j].value)  
            }
        }
        rightPrice.innerHTML = '￥'+price
    }
    // 加减函数声明
    const Cart =() => {
        const add = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .addCart .count  #add')
        const less = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .addCart .count  #less')
        let shopNum = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .addCart .count  #shopNum')
        shopNum.value = 0
        let num = parseInt (shopNum.value)
        shopNum.style.lineHight = '37px'
        shopNum.style.textAlign = 'center'
        add.addEventListener('click',() => {
            num +=1
            shopNum.value = num
        })
        less.addEventListener('click',() => {
            num -=1
            shopNum.value = num
            if(num<0){
                num =0
                shopNum.value = num
            }
        })
        
        
    }
    Cart()
    // 选择搭配中间区域复选框选中套餐价变动效果
    const choosepirce = () => {
        const ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input ')
        let leftPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p')
        let rightPrice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i')
        for (let i = 0; i < ipts.length; i++) {
            ipts[i].onclick = () => {
                let oldPrice = leftPrice.innerText.slice(1)
                for (let j = 0; j < ipts.length; j++) {
                    if(ipts[j].checked){
                        oldPrice = parseInt(oldPrice)+parseInt(ipts[j].value)
                    }
                }
                rightPrice.innerText = '￥'+oldPrice 
            }
        }
    }
    choosepirce()
    // 封装一个公共的选项卡函数
    let tab = (tabBtns,tabContents) => {
        for (let i = 0; i < tabBtns.length; i++) {
            tabBtns[i].index = i 
            tabBtns[i].onclick = () => {
                for (let j = 0; j < tabBtns.length; j++) {
                    tabBtns[j].className = ''
                    tabContents[j].className = ''
                }
                tabBtns[i].className = 'active';
                tabContents[tabBtns[i].index].className = 'active'
            }
        }
    }
    // 左侧选项卡
    const leftTab = () => {
        const h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4')
        const divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideContent>div')
        tab(h4s,divs)
    }
    leftTab()
    // 右侧内容区
    const rightTab = () => {
        const lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabBtns li')
        const divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .bottomDetail .tabContents div')
        tab(lis,divs)
    }
    rightTab()
    // 右侧侧边栏切换效果
    const rightAsideBind =() => {
        const btns = document.querySelector('#wrapper .rightAside .btns')
        const rightAside = document.querySelector('#wrapper .rightAside')
        let flag = true
        btns.onclick =() => {
            if(flag){
                btns.className = 'btns btnsOpen'
                rightAside.className = 'rightAside asideOpen'
            }else{
                btns.className = 'btns btnsClose'
                rightAside.className = 'rightAside asideClose'
            }
            flag = !flag
        }
    }
    rightAsideBind()
}

