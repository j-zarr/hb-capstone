function Gallery() {


}

function User() {
    return (
        <>
            <div class="container-fluid" >
                <div class="row flex-nowrap">
                    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <span>ARTwrks</span>
                            <span class="fs-5 d-none d-sm-inline">Gallery Menu </span> <br></br>
                            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <a href="/new-artwork" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline" style={{color:"#7FFF00"}}>Create</span></a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Portfolios</span></a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0 align-middle">
                                        <span class="ms-1 d-none d-sm-inline">Artworks</span></a>
                                </li>
                                <br></br>
                                <li>
                                    <div class="input-group input-group-sm mb-3">
                                        <input type="search" id="search-portfolios" class="form-control rounded" placeholder="Portfolio title" aria-label="Search" aria-describedby="search-addon" />
                                        <button type="button" class="btn btn-outline-primary">search</button>
                                    </div>
                                </li>

                                <li>
                                    <div class="input-group input-group-sm mb-3">
                                        <input type="search" id="search-artworkss" class="form-control rounded" placeholder="Artwork title" aria-label="Search" aria-describedby="search-addon" />
                                        <button type="button" class="btn btn-outline-primary">search</button>
                                    </div>
                                </li>
                                <a href="/logout" class="nav-link px-0 align-middle">
                                    <li>Log out</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ReactDOM.render(<User />, document.querySelector('#root'));



