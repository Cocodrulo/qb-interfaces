const SCRIPT_MODULES = ["input", "menu", "progressbar"];

const loadModules = async () => {
    const modules = SCRIPT_MODULES.map((name) => ({
        js: `./modules/${name}/app.js`,
        css: `./modules/${name}/style.css`,
    }));

    modules.forEach((module) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = module.css;
        document.head.appendChild(link);
    });

    await Promise.all(modules.map((module) => import(module.js)));
};

loadModules();
