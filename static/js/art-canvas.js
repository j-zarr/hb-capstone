

    if ($('#create-link').is(':disabled')) {

        const artCanvas = `
        <div>
            <span><button>DRAW</button></span>
            <span><button>PAINT</button></span>
            <span><button>ERASE</button></span>
            <span><button>SHAPEs...</button></span>
        </div>
        <canvas width="200" height="200" style="border:1px solid black;""></canvas>`

        $('#content-area').html(artCanvas);

    }

