async function start() {
    const cssFileName = `vapor.bootstrap.min.css`;
    const cssFilePath = `../bootstrap/${cssFileName}`;

    const styleLink = document.createElement('link');

    styleLink.rel = 'stylesheet';
    styleLink.type = 'text/css';
    styleLink.href = cssFilePath;
    document.head.appendChild(styleLink);
}

start();
