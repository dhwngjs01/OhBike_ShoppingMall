// URL 이동 함수
var link = (url) => {
  location.href = url;
};

// input 필드 포커스, 블러 효과
var inputFocusEffect = () => {
  $("input").focus(function () {
    $(this).siblings("label").addClass("active");
  });

  $("input").blur(function () {
    if ($(this).val() == "") $(this).siblings("label").removeClass("active");
  });
};

// 폼 전송 시 빈 값 피드백 효과
var validFeedback = (form) => {
  let inputList = $(form).find("input");
  let notCheckTypeList = ["password"];
  let emptyValueFlag = 0;

  let flag = 1;
  let firstEmptyInput = "";

  $(inputList).each((key, input) => {
    let type = $(input).attr("type");
    let val = $(input).val();
    let required = $(input).data("required");

    if (required) {
      if (notCheckTypeList.includes(type)) {
        if (val == "") {
          $(input).siblings(".valid-feedback").css({ visibility: "visible" });
          emptyValueFlag = 1;

          if (flag) {
            firstEmptyInput = key;
            flag = 0;
          }
        } else {
          $(input).siblings(".valid-feedback").css({ visibility: "hidden" });
        }
      } else {
        if ($.trim(val) == "") {
          $(input).siblings(".valid-feedback").css({ visibility: "visible" });
          emptyValueFlag = 1;

          if (flag) {
            firstEmptyInput = key;
            flag = 0;
          }
        } else {
          $(input).siblings(".valid-feedback").css({ visibility: "hidden" });
        }
      }
    }
  });

  if (firstEmptyInput != "") {
    $(inputList[firstEmptyInput]).focus();
  }

  if (emptyValueFlag) return false;

  return true;
};

var onlyNumber = (obj, e) => {
  if (e.which == "229" || (e.which == "197" && $.browser.opera)) {
    setInterval(function () {
      obj.trigger("keyup");
    }, 100);
  }

  if (
    !(
      (e.which && e.which > 47 && e.which < 58) ||
      e.which == 8 ||
      e.which == 9 ||
      e.which == 0 ||
      (e.ctrlKey && e.which == 86)
    )
  ) {
    e.preventDefault();
  }

  var value = obj.val().match(/[^0-9]/g);

  if (value != null) {
    obj.val(obj.val().replace(/[^0-9]/g, ""));
  }
};
