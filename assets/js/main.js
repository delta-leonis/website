document.addEventListener('DOMContentLoaded', async () => {
    let canvas = SVG('svg-container').size('90%', '90%').viewbox(0,0,640,480),
        elementList = {
            particle  : document.getElementById('particles-js'),
            content   : document.getElementById('content'),
            navigation: document.getElementById('main-nav'),
            drawing   : document.getElementById('svg-container')
        };

    particlesJS.load('particles-js', 'assets/js/particlesjs-config.json', () => {
        elementList.particle.style.animation = 'show 3s forwards'
    });

    let svgAnimations = await illustrator(canvas, soccerPitch).then(async (result) => {
        let animated = await animator(result);
        return canvas
    });

    let buttons = setButtons(canvas, elementList);
});

function setAnimation(canvas, id) {
    return new Promise(async (resolve, reject) => {
        await killall(canvas);
        switch (id) {
            case 'home':
                await illustrator(canvas, soccerPitch).then((result) => {animator(result);});
                break;
            case 'zosma':
                await illustrator(canvas, starSystem).then((result) => {animator(result);});
                break;
            case 'algieba':
                await illustrator(canvas, graph).then((result) => {animator(result);});
                break;
            default:
                reject('Unknown animation id');

        }
        resolve('done');
    })
}

function setButtons(canvas, elementList) {
    let buttons = document.getElementsByTagName("li");
    for (let button of buttons) {
        button.addEventListener('click', async (event) => {
            if (!event.target.classList.contains('active')) {
                let oldActive = document.querySelectorAll('li.active'),
                    newActive = document.querySelectorAll('li.' + event.target.className),
                    oldElement = elementList.content.getElementsByClassName('active'),
                    targetEl = elementList.content.getElementsByClassName(event.target.className),
                    id = targetEl[0].className.split(' ').pop();

                await setAnimation(canvas, id);
                oldElement[0].classList.replace('active','hidden');
                targetEl[0].classList.replace('hidden','active');

                for (let i = 0; i < oldActive.length; i++ ) {
                    oldActive[i].classList.remove('active');
                    newActive[i].classList.add('active');
                }
            }

        });
    }
    return buttons
}

function killall(draw){
    return new Promise(((resolve, reject) => {
        draw.each(function() {
            this.removeClass('*');
            this.off();
            this.stop();
        }, true);
        draw.ungroup();
        draw.clear();
        resolve('done');
    }))
}
