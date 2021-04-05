Hooks.on("renderSidebarTab", async (app, html) => {
  if (app.options.id == "actors") {
    let button = $("<button class='import-fichas-nimb'><i class='fas fa-file-import'></i> Importar Ficha de Nimb</button>")

    button.click(function () {
      console.log('Botão clicado');
    });

    html.find(".directory-footer").append(button);
  }
});

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins it's initialization workflow.");
});