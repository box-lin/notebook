const readConfig = (url) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      dataType: "text",
      success: function (data) {
        try {
          var doc = jsyaml.load(data);
          resolve(doc);
        } catch (e) {
          reject(e);
        }
      },
      error: function (err) {
        reject(err);
      },
    });
  });
};
