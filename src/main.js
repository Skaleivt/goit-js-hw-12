import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('input');
const button = document.querySelector('.form button');

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, scrollByCardHeight, buttonLoader, optionIzi } from './js/render-functions'

let query = ' ';
let page = 1;
let totalHits = ' ';
let totalPages = ' ';
const perPage = 15;

button.addEventListener('click', async (event) => {
    event.preventDefault();
    
    query = input.value.trim();

    if (!query) {
        iziToast.warning({
          message: "Please enter a search query.",
          ...optionIzi
        });
        return;
    }
    clearGallery();
    showLoader();
    hideLoadMoreButton();
    
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
            } else {
                createGallery(data.hits)
                page += 1;
                if (page > totalPages) {
                    return
                } else {
                    showLoadMoreButton();
                }
            }
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
    hideLoadMoreButton();
    showLoader();   
    if (page > totalPages) {
        hideLoader();
        iziToast.info({
            message: "We're sorry, there are no more posts to load",
            ...optionIzi
        }); 
    return        
    }

    try {
        const data = await getImagesByQuery(query, page, perPage);
        createGallery(data.hits);
        page += 1;
        hideLoader();
        showLoadMoreButton();
        scrollByCardHeight();        
    } catch(err) {
            iziToast.error({
                message: "Error",
                ...optionIzi
            })
    } finally {
        hideLoader();
        }
    });     



            



    
    
    
    
    
  