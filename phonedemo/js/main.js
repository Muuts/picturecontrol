  $(document).ready(function() {        
        var img = $("#imageFullScreen");
        var divs = $('.imgcontent');

        //var zoomInButton = $('#zoomInButton');
        //var zoomOutButton = $('#zoomOutButton');

        var container = $('.container');

        /*获取原始尺寸比例*/
         var hei = img.height();
         var wid = img.width();


         /*操作滚动条移动方向*/
        $('#topPositionMap,#leftPositionMap,#rightPositionMap,#bottomPositionMap').on("click", moveButtonClickHandler);
        function moveButtonClickHandler(e){  
            switch(e.target.id){
                case "leftPositionMap":pixelX(-100);
                break;

                case "rightPositionMap":pixelX(100)
                break;

                case "topPositionMap": pixelY(-100);       
                break;

                case "bottomPositionMap":pixelY(100)      
                break;              
            }
        } 

        /*横向移动距离*/
        function pixelX(size){
                console.log(55);
                $(document).scrollLeft($(document).scrollLeft()+size);
        } 
        /*纵向移动距离*/
        function pixelY(size){
             $(document).scrollTop($(document).scrollTop()+size);
        }


        /*操作图片变换*/
        var origal =  $('#original');
        var Is_click = true;
        origal.on('click',orignal);

        function orignal(){
                if(Is_click){
                    Is_click = false;
                    img.height(hei);
                    img.width(wid);
                    origal.addClass('change').removeClass('yuan');
                }else{
                    Is_click = true;
                    resize();
                    origal.addClass('yuan').removeClass('change');
                }
        }


        /*按浏览器高度，给相片设置宽高*/
        function resize(){   
             img.css({
                'height':$(window).height(),
                'width':'auto'
             });
             $('.imgcontent').height($(window).height()); 
             $('.imgcontent').width(img.width());
             container.css({
                'width':divs.width(),
             })
        }
        resize();

        /*拖动插件draggabilly*/
        var $draggable = divs.draggabilly({
            containment: '.container'
          });

        var draggie = divs.data('draggabilly')

        $draggable.on( 'dragStart', function( event, pointer ) {
                var disX = event.clientX + $(document).scrollLeft();
                var disY = event.clientY + $(document).scrollTop();
                $draggable.on( 'dragMove', function( event, pointer, moveVector ) {
                    /*通过总值不变，而点击的位置变化来实现，滚动条的滚动*/
                       $(document).scrollLeft(disX - event.clientX);
                       $(document).scrollTop(disY - event.clientY);
                    }) 
            })    

        /*刷新页面时，重调比例*/
        $(window).resize(function() {
            resize();
        });
        
        
        /*设置图片大小方法*/
        function Tosize(size,num){
                var oWidth = img.width(); //取得图片的实际宽度
                var oHeight = img.height(); //取得图片的实际高度     
                img.width(oWidth+size);
                img.height(oHeight + size/oWidth*oHeight);  
                
                if(img.height()>$(window).height()){
                    $('body').css({
                        'overflow':'auto'
                    })
                }else{
                    $('body').css({
                        'overflowY':'hidden'
                    })
                }  
                $('.imgcontent').height(img.height()); 
                $('.imgcontent').width(img.width());        
                container.css({
                   'width':divs.width(),

                }) 
        }

        /*放到缩小图片按钮*/
        // zoomInButton.on('click',addBotn);
        // zoomOutButton.on('click',narrowBotn);
        // var indexadd = 0;
        // var indexnarrow = 0;
        // function addBotn(){
        //    indexnarrow--;
        //     indexadd++;
        //     if(indexadd<=7){
        //          Tosize(880);
        //          /*重新给图片框设置宽高*/
        //          $('.imgcontent').width(img.width());
        //     }
        // }

        // function narrowBotn(){
        //     indexadd--;
        //     indexnarrow++;
        //     if(indexnarrow<=7){
        //         Tosize(-880);
        //         /*重新给图片框设置宽高*/
        //         $('.imgcontent').width(img.width());
        //     }    
        // }

        /*给图片添加滚动轮滚动事件
        *已给火狐添加兼容，通过isFirefox=navigator.userAgent.indexOf("Firefox")
        *判断火狐浏览器
        *再分别给轮动事件
        */
         img.each(function(){  
                if($.support){ 
                    console.log($.support);
                /*ie chrome*/
                    $(this).bind("mousewheel",function(e, delta){  
                        var e=e||event,v=event.wheelDelta||event.detail;               
                        if(v>0){
                            //resizeImg(this,false);
                             pixelX(-55)
                        }else{                                 
                            //resizeImg(this,true);  
                            pixelX(55)
                        }              
                           window.event.returnValue=false;  
                           return false;  
                    }) 

               }
               if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
                /*火狐兼容*/ 
                    $(this).bind("DOMMouseScroll",function(event){ 
                        console.log(event);
                        if(event.detail<0){
                             //resizeImg(this,false); 
                             pixelX(-55)
                         }else {
                             //resizeImg(this,true); 
                              pixelX(55) 
                         }            
                            event.preventDefault();  
                    })  
                }  
            });  
              
            /*轮动的页面放大缩小函数*/
            // function resizeImg(node,isSmall){  
            //     if(!isSmall){  
            //     Tosize(880);
            //              $('.imgcontent').width(img.width());       
            //     }else{  
            //         Tosize(-880); 
            //        $('.imgcontent').width(img.width());   
            //     }  
            // }  
    
    });

 