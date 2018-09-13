document.addEventListener('DOMContentLoaded', async () => {
    let canvas = SVG('drawing').size('90%', '90%').viewbox(0,0,640,480),
        divider = document.getElementsByClassName('divider'),
        particle = document.getElementById('particles-js'),
        navSidebar = document.getElementsByClassName('nav-sidebar'),
        navFooter = document.getElementsByClassName('nav-footer'),
        content = document.getElementsByClassName('content');

    particlesJS.load('particles-js', 'assets/js/vendor/particlesjs-config.json', () => {
        console.log('callback - particles.js config loaded');
    });

    divider[0].addEventListener('animationend', async (event) => {
        let svgAnimations = await illustrator(canvas, soccerPitch).then(async (result) => {
            let animated = await animator(result);
            return canvas
        });
        let buttons = await setButtons(svgAnimations);

        document.getElementById('loading').style.display = 'none';

        particle.style.animation = 'show 1s ease-out 0.2s forwards ';
        navSidebar[0].style.animation = 'slideRight 1.4s forwards';
        navFooter[0].style.animation = 'slideUp 0.2s ease-in 1.4s forwards';
        content[0].style.animation = 'show 2s ease-out 1s forwards ';
    });
});

function setAnimation(canvas, id) {
    return new Promise(async (resolve, reject) => {
        await killall(canvas);
        document.getElementById('drawing').style.animation = '';
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
                console.log('Unknown animation id');

        }
        resolve('done');
    })

}

function setButtons(canvas) {
    return new Promise((resolve, reject) => {
        let buttons = document.getElementsByTagName("li");
        for (button of buttons) {
            button.addEventListener('click', async (event) => {
                if (!event.target.classList.contains('active')) {
                    let oldActive = document.querySelectorAll('li.active'),
                        newActive = document.querySelectorAll('li.' + event.target.className),
                        element = document.querySelector('.content').getElementsByClassName('active'),
                        targetEl = document.querySelector('.content').getElementsByClassName(event.target.className),
                        id = targetEl[0].className.split(' ').pop();

                    await setAnimation(canvas, id);
                    element[0].classList.replace('active','hidden');
                    targetEl[0].classList.replace('hidden','active');

                    for (let i = 0; i < oldActive.length; i++ ) {
                        oldActive[i].classList.remove('active');
                        newActive[i].classList.add('active');
                    }
                }

            });
        }
        resolve(buttons);
    })

}

function killall(draw){
    return new Promise(((resolve, reject) => {
        draw.each(function(i, children) {
            this.removeClass('*');
            this.off();
            this.stop();
        }, true);
        draw.ungroup();
        draw.clear();
        resolve('done');
    }))
}