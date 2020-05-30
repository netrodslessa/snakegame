// aguardar a tela carregar

window.onload = function () {

    const stage = document.querySelector('#stage');
    const ctx = stage.getContext('2d');
    document.addEventListener('keydown', keyPush)
    let velocidade = 50;
    setInterval(game, velocidade);

    const vel = 1;

    let placar = 0;
    let vx = vy = 0;
    let px = 10;
    let py = 15;
    // tamanho da peça
    let tp = 20;
    // quantidade de quadrados
    let qp = 30;
    //posição da maçã
    let ax = ay = 15;

    //elementos no rastro da cobra
    let trail = [];
    //Tamanho da calda
    tail = 5;

    function game() {
        // atualização px = cabeça da cobra
        px += vx;
        py += vy;

        if (px < 0) {
            // px = quantidade de peças -1
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if (py < 0) {
            py = qp - 1;
        }
        if (py > qp - 1) {
            py = 0;
        }


        //pintando o stage
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, stage.width, stage.height);

        //pintando maçã
        ctx.fillStyle = 'red';
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = 'gray';
        //definir o rastro
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
            if (trail[i].x == px && trail[i].y == py) {
                vx = vy = 0;
                tail = 5;
                if(vx != 0 || vy != 0){
                    alert('acabou')
                }
            }
        }
        // movimentação - push inclui no começo e shift tira do final
        trail.push({
            x: px,
            y: py
        })
        while (trail.length > tail) {
            trail.shift();
        }
        // se comer a maçã, adiciona um elemento na calda
        if (ax == px && ay == py) {
            tail++;
            //adiciona 10 ao placar
            placar += 10;
            //reposiciona a maçã
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }




    // movimentação da cobra
    function keyPush(event) {

        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break;
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;
            default:

                break;
        }



    }

}