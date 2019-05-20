<template>
    <div class="loveVue" v-if="show">
        <!-- menu -->
        <div class="love">
            <div class="bg" :class="{runCircle: runCircleSign}">
                <!-- 六个树叶 -->
                <div class="leafs">
                    <div v-for="(item, index) in menuList"
                         :key="item.name"
                         class="leaf"
                         @click="runCircle(item.name, index)"
                         :class="`leaf${index+1}`">
                        <img :src="item.url" alt="">
                        <span class="nameSpain"><i :class="item.icon"></i> {{ item.name }}</span>
                    </div>
                    <!-- 小心心 -->
                    <div class="heart"
                         :class="{heartScale: heartScaleSign}"
                         @click="heartScale">
                        <img src="../assets/love/heart.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- card -->
        <div class="cardPosition" v-if="showCard" :class="{cardMiss:cardMiss}">
            <el-card class="box-card" :style="{background: cardGround}">
                <!-- 头部 -->
                <div slot="header" class="clearfix">
                    <span class="cardName">
                        <i :class="menuList[menuIndex].icon"></i>
                        {{ cardName }}
                    </span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="backSign">
                        <i class="el-icon-close delBG"></i>
                    </el-button>
                </div>
                <!-- 内容 -->
                <div class="cardBody">
                    <!-- 走马灯 -->
                    <div class="basicShow" v-if="cardType === 0">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in swiperList" :key="item.url">
                                <img :src="item.url" alt="" width="150">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!-- 足迹 -->
                    <div class="foot" v-else-if="cardType === 1">
                        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
                            <el-tab-pane label="北京" name="first" class="mg5">
                                <el-tag>xxx</el-tag>
                                <el-tag type="success">xxx</el-tag>
                                <el-tag type="info">xxx</el-tag>
                                <el-tag type="warning">xxx</el-tag>
                                <el-tag type="danger">xxx xxx</el-tag>
                            </el-tab-pane>
                            <el-tab-pane label="郑州" name="second" class="mg5">
                                <el-tag type="warning">xxx</el-tag>
                                <el-tag type="success">xxx</el-tag>
                                <el-tag type="danger">xxx</el-tag>
                                <el-tag type="info">xxx</el-tag>
                                <el-tag>xxx</el-tag>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <!-- 说说 -->
                    <div class="say" v-if="cardType === 2">
                        <el-table
                                height="200"
                                :data="tableData"
                                :show-header="false"
                                :stripe="true"
                                style="width: 100%">
                            <el-table-column
                                    prop="words"
                                    label="日期">
                            </el-table-column>
                        </el-table>
                    </div>
                    <!-- 时刻 -->
                    <div style="height: 300px;overflow-y: scroll;"  v-else-if="cardType === 3">
                        <el-steps direction="vertical" :active="9" finish-status="success">
                            <el-step title="xxx" description="xxx"></el-step>
                            <el-step title="xxx" description="xxx"></el-step>
                            <el-step title="xxx" description="xxx"></el-step>
                            <el-step title="xxx" description="xxx"></el-step>
                            <el-step title="xxx" description="xxx"></el-step>
                            <el-step title="xxx" description="xxx "></el-step>
                        </el-steps>
                    </div>
                    <!-- 留言 -->
                    <div class="haveWords" v-else-if="cardType === 4">
                        <div class="cont">
                            <el-tag v-for="el in ku"
                                    :key="el.id"
                                    class="fly"
                                    :type="el.type"
                                    :style="{top:el.top + 'px'}"
                            >
                                {{ el.msg }}
                            </el-tag>
                        </div>
                        <div class="dealBox">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 5}"
                                    placeholder="请输入留言"
                                    v-model.trim="msg"
                                    size="small">
                            </el-input>
                            <el-button type="primary" size="small" @click="sendData">Biu~</el-button>
                        </div>
                    </div>
                    <!-- 影集 -->
                    <div class="movie" v-else-if="cardType === 5">
                        <el-button type="primary" icon="el-icon-caret-right" @click="watchMV"></el-button>
                    </div>
                </div>

            </el-card>
        </div>
        <!-- music -->
        <div class="music">
            <audio preload="auto" loop="loop" autoplay="autoplay">
                <source src="https://i.iandun.com:8085/group1/M00/02/10/rBHgNlzeKgiEFNI5AAAAAAnE4Fk269.mp3" type="audio/mp3" />
            </audio>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: false,
                runCircleSign: false,   // 旋转变小
                heartScaleSign: false,  // 心 变大缩小
                cardMiss: false,    // 卡片动画消失
                showCard: false,    // 卡片显示状态
                cardName: '',   // 卡片title
                cardChange: -1, //切换卡片
                cardGround: '', // 卡片背景色
                menuList: [
                    {
                        url: require('../assets/love/leaf1.png'),
                        icon: 'el-icon-picture-outline',
                        name: '相册'
                    },
                    {
                        url: require('../assets/love/leaf2.png'),
                        icon: 'el-icon-location',
                        name: '足迹'
                    },
                    {
                        url: require('../assets/love/leaf3.png'),
                        icon: 'el-icon-edit',
                        name: '说说'
                    },
                    {
                        url: require('../assets/love/leaf4.png'),
                        icon: 'el-icon-date',
                        name: '时刻'
                    },
                    {
                        url: require('../assets/love/leaf5.png'),
                        icon: 'el-icon-news',
                        name: '留言'
                    },
                    {
                        url: require('../assets/love/leaf6.png'),
                        icon: 'el-icon-printer',
                        name: '影集'
                    }
                ],
                swiperList: [
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636187&di=2b7c25a00b8186eb480d8e789325b754&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F713115bddd0e3b028e0600c71d3d4c91.jpeg'},
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636455&di=2db26c328f20d675af36fed185d2e8b4&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201508%2F27%2F1107273kppylb2zbhbk56f.jpg'},
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636455&di=9aa86cbeca24df19d25a52847f98b738&imgtype=0&src=http%3A%2F%2Fbbs-fd.zol-img.com.cn%2Ft_s800x5000%2Fg5%2FM00%2F01%2F00%2FChMkJ1Zq9uKIeZwbAAif1mkA4dwAAGDNQCwQ9cACJ_u710.jpg'},
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636455&di=9ffcb586370d813fd5df7e1154608044&imgtype=0&src=http%3A%2F%2Fbbs-fd.zol-img.com.cn%2Ft_s800x5000%2Fg5%2FM00%2F01%2F00%2FChMkJ1Zq96qIXDbnAAfCxR59L_AAAGDNgCbcPgAB8Ld556.jpg'},
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636455&di=3c6908760b85e321f54b2add7607aeba&imgtype=0&src=http%3A%2F%2Fi2.bbs.fd.zol-img.com.cn%2Ft_s800x5000%2Fg5%2FM00%2F01%2F00%2FChMkJ1Zq-O-IFQZjAAqZT1q_zUQAAGDNwIqFckACpln412.jpg'},
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636455&di=c7f4fdf2a763ffbf9ec379fb67559b21&imgtype=0&src=http%3A%2F%2Fi4.bbs.fd.zol-img.com.cn%2Ft_s800x5000%2Fg5%2FM00%2F01%2F00%2FChMkJ1Zq972IX1BDAAf9N749upUAAGDNgDNdowAB_1P764.jpg'},
                    {url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558348636454&di=52e9904f8d7cc73a097018830ae75001&imgtype=0&src=http%3A%2F%2Fi0.bbs.fd.zol-img.com.cn%2Ft_s800x5000%2Fg5%2FM00%2F01%2F00%2FChMkJ1Zq-EWIbYixAApE6gMQNqgAAGDNgL2Cz8ACkUC636.jpg'}
                ],
                cardType: 0,
                menuIndex: -1,
                activeName: 'first',   // 当前标签
                tableData: [
                    {words: '任世间情话万千不敌你蜜语甜言'},
                    {words: 'the darkness is no darkness with thee'},
                    {words: '长乐未央，长毋相忘'},
                    {words: 'Shall I compare thee to a Summers day ? Thou art more lovely and more temperate'},
                    {words: '今夕何夕，见此良人'},
                    {words: 'Lovers never meet. They\'re in each other all along'},
                    {words: '南风知我意，吹梦到商都'},
                    {words: 'I love three things in the world / The sun,The moon and You / Sun for morning,Moon for night,and you forever'},
                    {words: '大抵心有庭树，亭亭一如你风致'},
                    {words: '既见君子，云胡不喜'},
                    {words: '得其以偏爱，倾尽平生慷慨'},
                    {words: '山水一程，三生有幸'},
                    {words: '愿此生终老温柔，白云不羡仙乡'},
                    {words: '青青子衿，悠悠我心'},
                ],
                msg: null, //缓存
                ku: JSON.parse(localStorage.kuArr), //存取数据
                msgKu: []
            }
        },
        methods: {
            // 菜单缩放
            runCircle (name, index) {
                let _this = this;
                // 缩放
                this.runCircleSign = ! this.runCircleSign;
                this.menuIndex = index;
                // 赋值名称
                this.cardName = name;
                // 显示卡片
                this.showCard = true;
                // 卡片颜色
                switch (index) {
                    case 0:
                        _this.cardGround = 'rgba(129,15,175,0.4)';
                        _this.cardType = 0;
                        break;
                    case 1:
                        _this.cardGround = 'rgba(12,136,145,0.6)';
                        _this.cardType = 1;
                        break;
                    case 2:
                        _this.cardGround = 'rgba(255,235,45,0.6)';
                        _this.cardType = 2;
                        break;
                    case 3:
                        _this.cardGround = 'rgba(196,0,83,0.6)';
                        _this.cardType = 3;
                        break;
                    case 4:
                        _this.cardGround = 'rgba(87,174,157,0.6)';
                        _this.cardType = 4;
                        break;
                    case 5:
                        _this.cardGround = 'rgba(255,125,0,0.6)';
                        _this.cardType = 5;
                        break;
                }
            },
            // 心 缩放
            heartScale () {
                this.heartScaleSign = ! this.heartScaleSign;
            },
            // 消失卡片 && 菜单复原
            backSign () {
                let _this = this;
                _this.cardMiss = true;
                _this.runCircleSign = ! _this.runCircleSign;
                setTimeout(() => {
                    _this.showCard = false;
                    _this.cardMiss = false;
                }, 3000)
            },
            // 标签切换
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 跳页面
            watchMV () {
                // window.open('这里放入视频地址');
            },
            // 弹幕
            sendData () {
                let typeArr = ['','success','info','warning','danger'];
                let localArr = this.ku;
                if(this.msg !== '' && this.msg !== null) {
                    let num1 = Math.random() * 500;
                    let num2 = Math.random() * 5;
                    let arrMark = Math.floor(num2);
                    let top = Math.floor(num1);
                    let obj = {msg:this.msg,top:top,type:typeArr[arrMark]};
                    localArr.push(obj);
                    localStorage.kuArr = JSON.stringify(localArr);
                    this.msg = "";
                } else {
                    this.$message.warning('要先输入哦~');
                }
            },
        },

        created () {
            let _this = this;
            // 判断屏幕分辨率  超过480则提示移动端访问
            let width = document.body.clientWidth ;
            if (width > 450) {
                _this.$message('请用移动端设备访问');
            } else {
                _this.show = true;
            }
        },
        mounted () {
            let kuArr = [
                {msg: '爱你哟',top: -180,type: ''},
                {msg: '小宝贝',top: 552,type: 'warning'},
                {msg: 'love u',top: 12,type: 'success'},
            ];
            let str = JSON.stringify(kuArr);
            localStorage.setItem('kuArr', str);
        }

    }
</script>

<style type="text/scss" lang="scss" scoped>
.loveVue{
    background: #f0f4ec;
    padding-top: 20%;
    .love{
        width: 100%;
        margin: auto 0;
        background: url(../assets/love/bg.png) no-repeat 100% 100%;
        background-size: 100% 100%;
        .bg{
            width: 100%;
            height: 100vw;
            position: relative;
            animation: runBack 3s ease-in-out 0s 1 alternate forwards;
            &.runCircle{
                animation: runCircle 3s ease-in-out 0s 1 alternate forwards;
            }

            .leafs{
                .leaf{
                    transition: all 1s;
                    transform: scale(1.0);
                    position: absolute;
                    z-index: 0;
                    -webkit-tap-highlight-color:rgba(255,255,255,0);
                    img{
                        width: 100px;
                    }
                    .nameSpain{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #fff;
                        font-size: 13px;
                    }
                }
                .leaf1{top: 9%;left: 20%;}
                .leaf2{top: 38%;left: 5%;img{width: 110px;}}
                .leaf3{top: 64%;left: 20%;}
                .leaf4{top: 64%;right: 20%;}
                .leaf5{top: 38%;right: 5%;img{width: 110px;}}
                .leaf6{top: 9%;right: 20%;}
                .leafActive{
                    z-index: 2;
                    transition: all 1.5s;
                    transform: scale(1.3);
                }

                .heart{
                    position: absolute;
                    left: 50%;
                    top: 54%;
                    transition: all 1s;
                    transform: translate(-50%, -50%) scale(1.0);
                    z-index: 1;
                    img{
                        width: 160px;
                    }
                }
                .heartScale{
                    transition: all 1.5s;
                    transform: translate(-50%, -50%) scale(1.8);
                }
            }

        }
    }


    .cardPosition{
        width: 100%;
        position: fixed;
        top: 20%;
        left: 0;
        z-index: 999;
        animation: runBack 3s ease-in-out 0s 1 alternate forwards;
        .el-card{
            margin: 0 auto;
            width: 80%;
            .cardName{
                color: #fff;
            }
            .cardBody{
                background: rgba(255, 255, 255, 0.8);
                padding: 5px 10px;
                border-radius: 5px;
            }

            .foot{
                padding: 20px 0;
                .mg5{
                    span{
                        margin: 5px 2px;
                    }
                }
            }

            .movie{
                padding: 50px 0;
                background: #000;
                border-radius: 5px;
                text-align: center;
            }

            .haveWords{
                padding: 20px 0;
                .cont{
                    .fly {
                        position: fixed;
                        z-index: 999;
                        transform: translateX(100vw);
                        animation: go 6s ease-in infinite;

                    }
                    @keyframes go {
                        from {
                            transform: translateX(90vw);
                        }
                        to {
                            transform:  translateX(-30vw);
                        }
                    }
                }
                .dealBox{
                    margin: 30px 0;
                    display: flex;
                    justify-content: space-between;
                    input,button{
                        margin: 0 5px;
                    }
                }
            }


        }
    }
    .cardMiss{
        animation: runCircle 3s ease-in-out 0s 1 alternate forwards;
    }


    .music{

    }

}

/*deleteBG*/
.delBG{
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    color: #fff;
}

/* animation */
@keyframes runCircle {
    0% {
        transform: scale(1.0) rotate(0deg);
        transform-origin: center center;
    }
    25% {
        transform: scale(1.3) rotate(-15deg);
    }
    100% {
        transform: scale(0.05) rotate(360deg);
        transform-origin: center center;
    }
}
@keyframes runBack {
    0% {
        transform: scale(0.05) rotate(360deg);
        transform-origin: center center;
    }
    100% {
        transform: scale(1.0) rotate(0deg);
        transform-origin: center center;
    }
}
</style>