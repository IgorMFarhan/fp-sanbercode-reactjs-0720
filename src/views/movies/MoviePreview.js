import React, { useContext } from 'react';
import { MovieContext } from '../../context/MovieContext';
import { CCardHeader, CCardTitle, CCard, CCardBody, CCol, CRow, CImg, CListGroup, CListGroupItem, CLink } from '@coreui/react';

const MoviePreview = ({ match }) => {
    const [movies, setMovies] = useContext(MovieContext);
    const selected = movies.list.find(movie => movie.id.toString() === match.params.id);

    const handleClick = (e) => {
        setMovies({
            ...movies,
            selectedID: selected.id,
        });
    }
    return (
        <CCard>
            <CCardHeader>
                <CCardTitle className="text-center p-0">
                    <CCol>
                        <strong>{selected.title}</strong>
                    </CCol>
                </CCardTitle>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol>
                        {selected.image_url !== null ? selected.image_url.includes("http") ?
                            <CImg src={selected.image_url} fluid width="100%" height="auto" />
                            :
                            <h3 className="text-center">Poster url is invalid</h3>
                            :
                            <div style={{ border: "1px solid black", display: "block", height: "100%", width: "auto" }}>
                                <h3 className="text-center">Link not found</h3>
                            </div>
                        }
                    </CCol>
                    <CCol>
                        <CListGroup>
                            <CListGroupItem> <strong>Movie ID: </strong> {selected.id}</CListGroupItem>
                            <CListGroupItem> <strong>Movie Title: </strong> {selected.title ? selected.title : "-"}</CListGroupItem>
                            <CListGroupItem> <strong>Year : </strong> {selected.year ? selected.year : "-"}</CListGroupItem>
                            <CListGroupItem color={selected.rating > 7 ? "success" : "danger"}> <strong>Ratings: </strong> {selected.rating > 7 ? selected.rating + " (good)" : selected.rating + " (bad)"}</CListGroupItem>
                            <CListGroupItem className="text-justify"> <strong>Duration : </strong> {selected.duration ? selected.duration : "-"}</CListGroupItem>
                            <CListGroupItem className="text-justify"> <strong>Genre : </strong> {selected.genre ? selected.genre : "-"}</CListGroupItem>
                            <CListGroupItem className="text-justify"> <strong>Description : </strong> {selected.description ? selected.description : "-"}</CListGroupItem>
                            <CListGroupItem className="text-justify"> <strong>Review : </strong> {selected.review ? selected.review : "-"}</CListGroupItem>
                            <CListGroupItem >
                                <CLink to="/movie/edit" className="btn btn-warning text-dark" onClick={handleClick}> <strong>Edit</strong> </CLink>
                            </CListGroupItem>
                        </CListGroup>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default MoviePreview;
