import lang_j from '@/assets/json_lang/lang.json';
import login_j from '@/assets/json_lang/login.json';
import error_j from '@/assets/json_lang/error.json';
import group_j from '@/assets/json_lang/group.json';
import orientations_j from '@/assets/json_lang/orientations.json';
import subjects_j from '@/assets/json_lang/subject.json';
import user_j from '@/assets/json_lang/user.json';
import consultation_j from '@/assets/json_lang/consultation.json';
import nav_j from '@/assets/json_lang/nav.json';

export function getWord({word,file,lang}){
    let palabra = "???";
    //console.log(palabra);
    switch(file){
        case 'lang':
            palabra = lang_j[word][lang];
            break;
        case 'login':
            palabra = login_j[word][lang];
            break;
        case 'error':
            palabra = error_j[word][lang];
            break;
        case 'group':
            palabra =  group_j[word][lang];
            break;
        case 'subject':
            palabra =  subjects_j[word][lang];
            break;
        case 'orientation':
            palabra =  orientations_j[word][lang];
            break;
        case 'user':
            palabra =  user_j[word][lang];
            break;
        case 'consultation':
            palabra =  consultation_j[word][lang];
            break;
        case 'nav':
            //console.log('idioma : ' + lang);
            palabra =  nav_j[word][lang];
            break;
        default:
            palabra = "{missing}";
            break;
    }
    palabra = palabra ? palabra : "{missing}";
    return palabra;
}