Hooks.on("renderSidebarTab", async (app, html) => {
  if (app.options.id == "actors") {
    let button = $("<button class='import-fichas-nimb'><i class='fas fa-file-import'></i> Importar Ficha de Nimb</button>")

    button.click(function () {
      new FDNImporter().render(true);
    });

    html.find(".directory-footer").append(button);
  }
});

Hooks.on("init", function() {
  // game.settings.register("fichas-de-nimb-fvvt", "importSettings", {
  //   name: "Local padrão do Fichas de Nimb",
  //   scope: "client",
  //   config: false,
  //   default: {
  //     source: "data",
  //     extension: "png",
  //     bucket: "",
  //     region: "",
  //     path: "worlds/" + game.world.name,
  //     offset: 0.1,
  //     fidelity: 3,
  //     multiImageMode: "g",
  //     webpConversion: true,
  //     wallsAroundFiles: true,
  //   }
  // })
});


class FDNImporter extends Application {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.id = "import-fichas-nimb";
    options.template = "modules/fichas-de-nimb-fvvt/templates/importer.html"
    options.classes.push("fdn-importer");
    options.resizable = true;
    options.height = "auto";
    options.width = 400;
    options.minimizable = true;
    options.title = "Importador de Fichas de Nimb"
    return options;
  }

  static async createActor(sheet) {
    console.log(sheet);
  }

  activateListeners(html) {
    super.activateListeners(html)

    html.find(".import-sheet").click(async ev => {
      const sheetInput = html.find("[name=ficha]");
      const sheetFile = sheetInput[0].files[0]

      ui.notifications.notify("Enviando arquivo...");
      const filename = `${sheetFile.name}${Math.floor(Math.random() * 1000000)}`;
      FDNImporter.uploadFile(sheetFile, filename);

      var reader = new FileReader();
      reader.addEventListener('load', function() {
        var result = JSON.parse(reader.result); // Parse the result into an object 
        FDNImporter.createActor(result);
      });

      reader.readAsText(sheetFile);

    });

    this.close();
  }

  static async uploadFile(file, filename) {
    let uploadFile = new File([file], filename + "." + 'json', { type: 'json' });
    return await FilePicker.upload('data', '/t20actors/', uploadFile, {})
  }
}