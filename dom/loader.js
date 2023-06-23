const basicUILoad = () => {
  $("#header").load("header.html", function () {
    // load images in
    $("#headImg").attr("src", "/img/icon.svg");
    $("#categoryImg").attr("src", "/img/category.svg");
    $("#appImg").attr("src", "/img/app.svg");
    console.log("Header loaded successfully.");
  });
  $("#contentBlock").css("padding-top", "60px");
  $("#footer").load("footer.html", function () {
    // This is a callback that executes when the load is done.
    console.log("Footer loaded successfully.");
    // Any additional code interacting with elements in footer.html
  });
};
