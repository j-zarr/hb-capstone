function Artwork_canvas() {
    return (
        <>
            <div class="container-fluid" >
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <span>ARTwrks</span>
                            <span class="fs-5 d-none d-sm-inline">Artwork Menu</span> <br></br>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Save</span></a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Update</span></a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Delete</span></a>
                                </li>
                                <li>
                                    <a href="/new-artwork" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Create</span></a>
                                </li>
                                <li>
                                    <a href="/logout" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Log out</span></a>
                                </li>
                                <li>
                                    <a href="/user" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline" style={{color:"#7FFF00"}}>Gallery</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col py-3 canvas">
                        <p>CANVAS WILL GO HERE!</p>
                        <canvas></canvas>
                    </div>
                </div>
            </div >
        </>
    );
}

ReactDOM.render(<Artwork_canvas />, document.querySelector('#root'));