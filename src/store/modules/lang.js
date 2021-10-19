import lang_j from '@/assets/json_lang/lang.json';
import login_j from '@/assets/json_lang/login.json';
import error_j from '@/assets/json_lang/error.json';
import group_j from '@/assets/json_lang/group.json';
import orientations_j from '@/assets/json_lang/orientations.json';
import subjects_j from '@/assets/json_lang/subject.json';
import user_j from '@/assets/json_lang/user.json';

export default {
    state: {
        user_lang:"en"
    },
    mutations: {
        setUserLang(state,lang){
            state.user_lang = lang;
        }
    },
    actions: {
        
        getWord({state},word){
            let palabra = "";
            switch(word.file){
                case 'lang':
                    palabra = lang_j[word.word][state.user_lang];
                    break;
                case 'login':
                    return new Promise((resolve,reject) => {
                            palabra = login_j[word.word][state.user_lang];
                            if(palabra != ""){
                                resolve(palabra);
                            }else{
                                reject("sexo?");
                            }   
                    });
                case 'error':
                    palabra = error_j[word.word][state.user_lang];
                    break;
                case 'group':
                    palabra =  group_j[word.word][state.user_lang];
                    break;
                case 'subject':
                    palabra =  subjects_j[word.word][state.user_lang];
                    break;
                case 'orientation':
                    palabra =  orientations_j[word.word][state.user_lang];
                    break;
                case 'user':
                    palabra =  user_j[word.word][state.user_lang];
                    break;
                default:
                    palabra = "CACA";
                    break;
            }
            return palabra;
        }
    }
}