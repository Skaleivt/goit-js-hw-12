import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('input');
const button = document.querySelector('.form button');

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, scrollByCardHeight, buttonLoader, updateLoadMoreVisibility, optionIzi } from './js/render-functions'

let query = '';
let page = 1;
let totalHits = 0;
let totalPages = 0;
const perPage = 15;

button.addEventListener('click', async (event) => {
    event.preventDefault();
    
    query = input.value.trim();
    page = 1;

    if (!query) {
        iziToast.warning({
          message: "Please enter a search query.",
          ...optionIzi
        });
        return;
    }
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    
    try {
        const data = await getImagesByQuery(query, page, perPage);
        totalHits = data.totalHits;
        totalPages = Math.ceil(totalHits / perPage);
            if (data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    ...optionIzi
                })
                hideLoader();
                return;
            } 
            createGallery(data.hits)
            page += 1;
            updateLoadMoreVisibility(page, totalPages);

        } catch (err) {
            iziToast.error({
                message: "Error",
                ...optionIzi
            })
            console.log(err);
        } finally {
        hideLoader();
          };
})


buttonLoader.addEventListener('click', async (event) => {
    event.preventDefault();
       
    if (page > totalPages) {
        iziToast.info({
            message: "We're sorry, there are no more posts to load",
            ...optionIzi
        }); 
        hideLoadMoreButton();
        return        
    }
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page, perPage);
        createGallery(data.hits);
        page += 1;
        scrollByCardHeight(); 
        updateLoadMoreVisibility(page, totalPages);
    } catch(err) {
            iziToast.error({
                message: "Error",
                ...optionIzi
            })
    } finally {
        hideLoader();
        }
    });     



            



    
    
    
    
    
  