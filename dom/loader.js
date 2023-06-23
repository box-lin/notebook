const basicUILoad = () => {
  $("#header").load("header.html", function () {
    // load images in
    $("#headImg").attr("src", "/img/bookIcon.svg");
    $("#categoryImg").attr("src", "/img/catIcon.svg");
    $("#appImg").attr("src", "/img/appIcon.svg");
    console.log("Header loaded successfully.");
  });
  $("#contentBlock").css("padding-top", "60px");
  $("#footer").load("footer.html", function () {
    // This is a callback that executes when the load is done.
    console.log("Footer loaded successfully.");
    // Any additional code interacting with elements in footer.html
  });
};
