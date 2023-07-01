const basicUILoad = () => {
  $("#header").load("header.html", function () {
    // load images in
    $("#headImg").attr("src", "img/bookIcon.svg");
    $("#categoryImg").attr("src", "img/catIcon.svg");
    $("#labelImg").attr("src", "img/labelIcon.svg");
    $("#appImg").attr("src", "img/appIcon.svg");
    $("#reviewImg").attr("src", "img/reviewIcon.svg");
  });
  $("#contentBlock").css("padding-top", "60px");
  $("#footer").load("footer.html", function () {
    // do nothing for now
  });
};
