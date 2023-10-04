var COMMENT_API_URL = "https://script.google.com/macros/s/AKfycby_t4EvNTiUJoOcZDgVbldbRf4ejQLj_2UleixrcNLQwOXhBJ-SYYDscFYNnZjtQM8/exec";
(function ($) {

    Kakao.init('5092f85949e8e3358403406a4e4e9fdd');

    var navbar = $('#navbar-main');
    var distance = navbar.offset().top;
    var $window = $(window);

    function judgeStickyMenu() {
        var windowWidth = window.innerWidth;
        if ($window.scrollTop() >= distance) {
            if (!navbar.hasClass('navbar-fixed-top')) {
                navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
                $("body").css("padding-top", "60px");
                if (windowWidth < 991) {
                    $("._header-content").show();
                } else {
                    $("._header-content").hide();
                }
            }
        } else {
            navbar.removeClass('navbar-fixed-top');
            $("body").css("padding-top", "0px");
            $("._header-content").hide();
        }
    }

    $window.scroll(function () {
        judgeStickyMenu();
    });


    if ($("#scroll").length) {
        $('#scroll').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({scrollTop: $(this.hash).offset().top}, 1000, "easeInOutExpo");
            return false;
        });
    }

    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("._openSmallNavButton");

        openBtn.on("click", function () {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
                navbar.focus();
                closeBtn.show();
            }
            return false;
        });

        closeBtn.on("click", function () {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;
        });

        navbar.on('blur', function (e) {
            navbar.removeClass("slideInn");
        });
    }

    toggleMobileNavigation();


    function toggleClassForMobileNavigatorMenu() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");
        var closeBtn = $("._openSmallNavButton");
        var navbar = $('#navbar');
        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
            navbar.attr('tabIndex', 0);
            if ($window.scrollTop() >= distance) {
                $("._header-content").show();
            }
            closeBtn.show();
        } else {
            mainNav.removeClass("small-nav");
            navbar.attr('tabIndex', undefined);
            $("._header-content").hide();
            closeBtn.hide();
        }
    }

    toggleClassForMobileNavigatorMenu();


    // Function for small menu
    function setupNavigatorMenu() {
        var windowWidth = window.innerWidth;
        var smallNav = $(".navigation-holder > .small-nav");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");
        var closeBtn = $("._openSmallNavButton");

        if (windowWidth <= 991) {
            menuItemWidthSubMenu.on("click", function (e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
            });
            closeBtn.show();
        } else if (windowWidth > 991) {
            closeBtn.hide();
        }
    }

    setupNavigatorMenu();


    // SLIDER
    var menu = [];
    jQuery('.swiper-slide').each(function (index) {
        menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
    });

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function (indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass: 'wow',      // default
        animateClass: 'animated', // default
        offset: 0,          // default
        mobile: true,       // default
        live: true        // default
    });


    /*------------------------------------------
        = GALLERY USING SWIPER
    -------------------------------------------*/
    function initGalleryBySwiper() {

        var sSwiperMainSelector = '._swiper_main';
        var sSwiperThumbnailSelector = "._swiper_thumbnail";

        var welSwiperMain = $(sSwiperMainSelector);
        var welSwiperThumbnail = $(sSwiperThumbnailSelector);

        // init swiper-slide images
        var imageCount = 1;

        var initSwiper = function () {
            var swiper_thumbnail = new Swiper(".swiper_thumbnail", {
                slidesPerView: 5,
                spaceBetween: 10,
                autoHeight: true
            });

            var swiper = new Swiper('.swiper_main', {
                loop: true,
                // centeredSlides: true,
                autoHeight: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiper_thumbnail,
                },
            })
        };

        var initGalleryImages = function () {
            var nMaxSize = 10;
            $(`<img src="assets/images/gallery/pic-${imageCount++}.jpg">`)
                .load(function (e) {
                    var welImage = $(e.target);
                    welSwiperMain.find('._swiper-wrapper').append($('<div class="swiper-slide"></div>')
                        .on('click', function (e) {

                        })
                        .append(welImage)
                    );
                    welSwiperThumbnail.find('._swiper-wrapper').append($('<div class="swiper-slide"></div>').append(welImage.clone()));
                    imageCount < nMaxSize ? initGalleryImages() : initSwiper();
                }).error(function (e) {
                imageCount = Math.max(imageCount - 2, 0);
                console.log('loading done. imageCount: ' + imageCount);
                initSwiper();
            });
        };


        initGalleryImages();

    }

    initGalleryBySwiper();

    /*------------------------------------------
        = smooth scroll
    -------------------------------------------*/

    $("a.smooth-scroll").click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var navbar = $(".navigation-holder");
            navbar.removeClass('slideInn');
            // Figure out element to scroll to
            var target = this.hash === '#home' ? $(document.body) : $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
                event.preventDefault();
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top
                    },
                    1000,
                    function () {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    }
                );
            }
        }
    });

    /*------------------------------------------
        = TEXT COPY
    -------------------------------------------*/
    function copyTextToClipboard(sText) {
        var $input = $('#clipBoardInput');

        $input.val(sText);
        $input.select();
        document.execCommand("copy");
    }

    /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
    if ($("#clock").length) {
        $('#clock').countdown('2023/12/16', function (event) {
            var $this = $(this).html(event.strftime(''
                + '<div class="box"><div>%D</div> <span>Days</span> </div>'
                + '<div class="box"><div>%H</div> <span>Hours</span> </div>'
                + '<div class="box"><div>%M</div> <span>Mins</span> </div>'
                + '<div class="box"><div>%S</div> <span>Secs</span> </div>'));
        });
    }

    /*------------------------------------------
        = 계좌 관련 로직
    -------------------------------------------*/

    function registerAccountClickEventHandler() {
        // 계좌 복사 버튼
        $.each($('._btn-account-copy'), function (index, elAccountCopyButton) {
            $(elAccountCopyButton).on('click', function (e) {
                var sAccountNumber = $(e.target).closest('.row').find('._accountNumber').text();
                copyTextToClipboard(sAccountNumber);
                showSnackBar('계좌 복사 완료');
            });
        });

        // 네이버 페이 송금 버튼
        $.each($('.npay-button'), function (index, elNpayButton) {
            $(elNpayButton).on('click', function (e) {
                var $li = $(e.target).closest('li');
                var sBankName = $li.find('._bankName').text();
                var sAccountNumber = $li.find('._accountNumber').text();
                var sSendName = sBankName + ' ' + sAccountNumber;
                copyTextToClipboard(sSendName);
                window.open('https://new-m.pay.naver.com/remit/select?cancelUrl=' + encodeURI(location.href) + '&amlComplete=true');
            });
        });

        // 카카오페이 송금 버튼
        $.each($('.kakao-pay-button'), function (index, elNpayButton) {
            $(elNpayButton).on('click', function (e) {
                var welTarget = $(e.target);

                if (welTarget.prop('tagName') !== 'BUTTON') {
                    welTarget = welTarget.closest('button');
                }

                var sDataType = welTarget.data('account-type');

                var oFieldReplace = {
                    "husband": "신랑",
                    "bride": "신부",
                    "father": "아버지",
                    "mother": "어머니",
                    "-" : " "
                };

                var replaceDataTypeToLabel = function (sDataType) {
                    var replacedString = sDataType;
                    $.each(oFieldReplace, function (typeWord, replaceTarget) {
                        replacedString = replacedString.replace(typeWord, replaceTarget)
                    });

                    return replacedString;
                }

                var sKakaoPaySendLink;
                switch (sDataType) {
                    case 'husband':
                        sKakaoPaySendLink = "https://qr.kakaopay.com/FdXkREmat";
                        break;
                    case 'husband-father':
                        sKakaoPaySendLink = "https://qr.kakaopay.com/FIJPC45sI";
                        break;
                    case 'husband-mother':
                        sKakaoPaySendLink = "https://qr.kakaopay.com/FIaT6fr96";
                        break;
                    case 'bride':
                        sKakaoPaySendLink ="https://qr.kakaopay.com/FNeHTKSOF";
                        break;
                    case 'bride-father':
                        sKakaoPaySendLink = "https://qr.kakaopay.com/FbX6LZYFW"
                        break;
                    case 'bride-mother':
                        sKakaoPaySendLink = "https://qr.kakaopay.com/FKVle19w0"
                        break;
                }
                if (!sKakaoPaySendLink) {
                    showSnackBar('아직 ' + replaceDataTypeToLabel(sDataType) + "께서 카카오페이 송금 준비가 되지 않으셨습니다.")
                } else {
                    window.open(sKakaoPaySendLink);
                }
            });
        });

    }

    registerAccountClickEventHandler();

    /*------------------------------------------
        = footer 공유 관련 로직
    -------------------------------------------*/
    function registerShareLinkClickEventHandler() {
        $('#kakaoShareLink').on('click', function (e) {
            e.preventDefault();
            var sUrl = location.href
            Kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: '김민재 ♡ 김수정 결혼합니다.',
                    description: '2023년 12월 16일 토요일 오후 2시 30분\n신도림 웨스턴베니비스 7층',
                    imageUrl: sUrl + "assets/images/slider/slide-1.jpg", //이미지는 업로드 후에 올리기
                    link: {
                        mobileWebUrl: sUrl,
                        webUrl: sUrl
                    }
                },
                buttons: [{
                    title: '청첩장 보러가기',
                    link: {
                        mobileWebUrl: sUrl,
                        webUrl: sUrl
                    }
                }]
            })
        });

        $('#urlCopyLink').on('click', function (e) {
            e.preventDefault();
            copyTextToClipboard(location.href);
            showSnackBar('URL 복사 완료');

        });
    }


    registerShareLinkClickEventHandler();

    /*------------------------------------------
        = NAVER MAP
    -------------------------------------------*/
    $("._mapDetail button").on('click', function () {
        window.open('https://map.naver.com/p/entry/place/31413985?c=15.00,0,0,0,dh');
    });


    /*------------------------------------------
        = KAKAO MAP
    -------------------------------------------*/
    function kakaoMap() {
        var container = document.getElementById('kakaoMap');
        var options = {
            center: new daum.maps.LatLng(37.507057076152165, 126.89050764957459),
            level: 3
        };

        var map = new daum.maps.Map(container, options);

        //map.setDraggable(false);

        var positions = [
            {
                title: '신도림 웨스턴 베니비스',
                latlng: new daum.maps.LatLng(37.507057076152165, 126.89050764957459),
                link: "https://place.map.kakao.com/18887815"
            }
        ];

        for (var i = 0; i < positions.length; i++) {

            // 마커를 생성합니다
            var marker = new daum.maps.Marker({
                position: positions[i].latlng
            });

            marker.setMap(map);

            var iwContent = '<div style="width:160px"><a style="width=50px;padding: 5px; font:14px/2 sans-serif; text-decoration: underline;" target="_blank" href="' + positions[i].link + '"><strong>' + positions[i].title + '</strong></a></div>',
                iwPosition = positions[i].latlng


            var infowindow = new daum.maps.InfoWindow({
                position: iwPosition, // 마커를 표시할 위치
                content: iwContent, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            });

            infowindow.open(map, marker);
        }
    }

    kakaoMap();


    $(window).on('load', function () {
        wow.init();
        toggleMobileNavigation();
        setupNavigatorMenu();
        judgeStickyMenu();
    });


    $(window).on("resize", function () {

        toggleClassForMobileNavigatorMenu();
        clearTimeout($.data(this, 'resizeTimer'));

        $.data(this, 'resizeTimer', setTimeout(function () {
            setupNavigatorMenu();
        }, 200));

    });

    /**
     * 메시지 관련 기능
     */

    $("#writeCommentArea").on('hide.bs.modal', function () {
        $('#savingNoticeArea').hide();
        $("#commentName").val('');
        $("#commentPassword").val('');
        $("#commentContent").val('');
        $('#formNoticeArea').hide();
    });


    // 메시지 불러오기
    // initCommentList();

    // 메시지 저장
    $("#saveCommentButton").on("click", function () {
        var sUrl = COMMENT_API_URL + "?method=write";

        var oData = {
            "name": $("#commentName").val(),
            "password": $("#commentPassword").val(),
            "content": $("#commentContent").val()
        };

        if (!$("#commentName").val()) {
            $('#formNotice').text('이름을 입력해 주세요');
            $('#formNoticeArea').show();
            return;
        } else if (!$("#commentPassword").val()) {
            $('#formNotice').text('패스워드를 입력해주세요');
            $('#formNoticeArea').show();
            return;
        } else if (!$("#commentContent").val()) {
            $('#formNotice').text('내용을 입력해주세요');
            $('#formNoticeArea').show();
            return;
        }

        $('#formNoticeArea').hide();
        $('#savingNoticeArea').show();

        $.ajax({
            type: "POST",
            url: sUrl,
            data: JSON.stringify(oData),
            success: function (sResponse) {
                $('#savingNoticeArea').hide();
                var oResponse = JSON.parse(sResponse);

                if (oResponse.result === 'success') {
                    $("#commentName").val('');
                    $("#commentPassword").val('');
                    $("#commentContent").val('');
                    $('#formNoticeArea').hide();
                    $('#writeCommentArea').modal('hide');

                    var template = Handlebars.compile($("#tpl-comment").html())

                    initCommentList();
                    showSnackBar('저장 완료');
                }

                if (oResponse.result === 'error') {
                    $('#formNotice').text(oResponse.message);
                    $('#formNoticeArea').show();
                }
            },
            error: function (request, status, error) {
                $('#savingNoticeArea').hide();
                $('#formNotice').text('일시적인 오류가 발생하였습니다. 잠시 후 다시 시도해주세요');
                $('#formNoticeArea').show();
            }
        });

    });

})(window.jQuery);

var oCommentInfo = {
    "currentLastSeq": 0,
    "lastSeq": 0
};

// snack bar
function showSnackBar(sMessage) {
    // Get the snackbar DIV
    var welSnackBar = $('#snackbar');
    welSnackBar.text(sMessage);

    // Add the "show" class to DIV
    welSnackBar.addClass('show');

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        welSnackBar.removeClass('show');
    }, 3000);
}

function initCommentList() {
    var sUrl = COMMENT_API_URL;

    var welTotalCommentCount = $('#totalCommentCount');
    var welMoreCommentButton = $('._more-comment-button');
    var welCommentListArea = $('#commentListArea');
    welMoreCommentButton.hide();
    welCommentListArea.html($(Handlebars.compile($("#tpl-comment-loading").html())()));

    var htParams = {
        "method": "list",
        "fetchType": "all",
        "rows": 5,
        "sortType": "DESC"
    };


    $.ajax({
        type: "GET",
        url: sUrl,
        data: htParams,
        success: function (sResponse) {

            var oResponse = JSON.parse(sResponse);
            var template = Handlebars.compile($("#tpl-comment").html())

            welCommentListArea.empty();
            welCommentListArea.hide();

            if (oResponse.result === 'success') {
                var oBody = oResponse.body;
                oCommentInfo.lastSeq = oBody.lastSeq;
                if (oBody.totalCount > 0) {
                    welTotalCommentCount.text(oBody.totalCount);
                    var nCurrentLastSeq = 0;
                    $.each(oBody.commentList, function (index, oData) {
                        welCommentListArea.append($(template(oData)));
                        nCurrentLastSeq = oData.seq;
                    });
                    welCommentListArea.fadeIn(3000);
                    welMoreCommentButton.show();
                    welTotalCommentCount.show();
                    oCommentInfo.currentLastSeq = nCurrentLastSeq;
                } else {
                    welCommentListArea.html($(Handlebars.compile($("#tpl-comment-empty").html())())).fadeIn(3000);
                    welTotalCommentCount.hide();
                }
            } else {
                welCommentListArea.html($(Handlebars.compile($("#tpl-comment-empty").html())())).fadeIn(3000);
                welTotalCommentCount.hide();
            }
            $('._moreCommentLoadingText').hide();

        },
        error: function (request, status, error) {
            welCommentListArea.html($(Handlebars.compile($("#tpl-comment-empty").html())())).fadeIn(3000);
            welTotalCommentCount.hide();
            showSnackBar('메시지 가져오기 에러!');
        }
    });
}

function addCommentList() {
    var sUrl = COMMENT_API_URL;

    var welTotalCommentCount = $('#totalCommentCount');
    var welMoreCommentButton = $('._more-comment-button');
    var welMoreCommentLoadingText = $('._moreCommentLoadingText');
    var welCommentListArea = $('#commentListArea');

    welMoreCommentButton.hide();
    welMoreCommentLoadingText.show();

    var htParams = {
        "method": "list",
        "fetchType": "add",
        "basisSeq": oCommentInfo.currentLastSeq,
        "rows": 3,
        "sortType": "DESC"
    };


    $.ajax({
        type: "GET",
        url: sUrl,
        data: htParams,
        success: function (sResponse) {

            var oResponse = JSON.parse(sResponse);
            var template = Handlebars.compile($("#tpl-comment").html())

            if (oResponse.result === 'success') {
                var oBody = oResponse.body;
                oCommentInfo.lastSeq = oBody.lastSeq;
                var nCurrentLastSeq = oCommentInfo.currentLastSeq;
                $.each(oBody.commentList, function (index, oData) {
                    var welComment = $(template(oData)).hide();
                    welCommentListArea.append(welComment);
                    welComment.fadeIn(2000);
                    nCurrentLastSeq = oData.seq;
                });
                oCommentInfo.currentLastSeq = nCurrentLastSeq;
            }
            if (oCommentInfo.currentLastSeq <= oCommentInfo.lastSeq) {
                welMoreCommentButton.hide();
            } else {
                welMoreCommentButton.show();
            }

            welMoreCommentLoadingText.hide();
        },
        error: function (request, status, error) {
            showSnackBar('메시지 가져오기 에러!');
            welMoreCommentButton.show();
            welMoreCommentLoadingText.hide();
        }
    });
}

function commentEdit(seq) {
    showSnackBar("edit 기능 아직 미구현 (seq : " + seq + ")");
}

function commentDelete(seq) {
    showSnackBar("delete 기능 아직 미구현 (seq : " + seq + ")");
}



