document.addEventListener('DOMContentLoaded', async () => {
    let buttons = document.getElementsByTagName("li");
    for (button of buttons) {
        button.addEventListener('click', (event) => {
            if (!event.target.classList.contains('active')) {
                let oldActive = document.querySelectorAll('li.active');
                let newActive = document.querySelectorAll('li.' + event.target.className);
                let element = document.querySelector('.content').getElementsByClassName('active');
                let targetEl = document.querySelector('.content').getElementsByClassName(event.target.className);

                element[0].classList.replace('active','hidden');
                targetEl[0].classList.replace('hidden','active');

                for (let i = 0; i < oldActive.length; i++ ) {
                    oldActive[i].classList.remove('active');
                    newActive[i].classList.add('active');
                }
            }

        });
    }
    let canvas = SVG('drawing').size('100%', '100%').viewbox(0,0,640,480);
    let svgAnimations = await illustrator(canvas, soccerPitch).then(async (result) => {
        let animated = await animator(result);
        return animated
    });
    particlesJS.load('particles-js', 'assets/js/vendor/particlesjs-config.json', function() {
        console.log('callback - particles.js config loaded');
    });
    // console.log('loaded')
});
