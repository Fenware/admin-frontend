<template>
  <div class="text-white">
    <h1 class="text-center text-3xl mt-1 font-semibold">  {{getWord({file:'user',word:'user',lang})}}   </h1>
    <div
      v-if="'id' in edited_user"
      class="max-w-screen-sm mx-auto mt-2 text-white bg-gray-600 bg-opacity-10 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl
    "
    >
      <div
        class="
        flex
        justify-between
        pl-5
        items-center
        bg-gray-200 bg-opacity-10
        backdrop-filter backdrop-blur-xl
        shadow-2xl
        rounded-t-2xl
      "
      >
        <div class="flex items-center">
          <span class="material-icons">manage_accounts</span>
          <h2 class="px-2 font-extrabold select-none">  {{getWord({file:'user',word:'profile',lang})}}   </h2>
        </div>
        <div class="flex items-center">
          <!-- <button
          @click="createUser()"
          class="px-3 m-1 py-1 text-xs font-semibold transition-colors rounded-md bg-indigo-200 hover:bg-indigo-300 text-blue-900"
        >
          Guardar
        </button> -->

          <router-link
            :to="{ name: 'Users' }"
            class="btn-info rounded-tr-xl px-2 m-1 py-1 border-0 text-xs flex items-center"
          >
            <span class="material-icons text-sm mr-1">arrow_back</span>

            {{getWord({file:'lang',word:'back',lang})}}
          </router-link>
        </div>
      </div>

      <!-- Cuerpo__________________________ -->

      <div
        class="p-3 border-b-2 border-l-2 border-r-2 border-gray-700 rounded-b-2xl"
      >
        <h1 class="text-2xl text-indigo-300 font-bold text-center">
          {{ edited_user.type == "student" ? getWord({file:'lang',word:'student',lang}).toUpperCase()  : getWord({file:'lang',word:'teacher',lang}).toUpperCase() }}
        </h1>

        <div class="grid grid-cols-2 gap-2 px-10">
          <div class="mb-2 mt-2 col-span-2 flex items-center">
            <img
              class="w-3/12 mr-5"
              :src="require('@/assets/avatars/' + edited_user.avatar)"
              alt="avatar"
            />
            <div class="w-full">
              <div class="block">
                <span class="block select-none text-xs "
                  >{{getWord({file:'user',word:'identification_document',lang})}}</span
                >
                <p class="font-medium text-2xl tracking-widest px-2">
                  {{ edited_user.ci }}
                </p>
              </div>

              <div class="block mt-2 ">
                <label for="nickname" class="block select-none text-xs"
                  >{{getWord({file:'user',word:'nickname',lang})}}</label
                >
                <input
                  id="nickname"
                  class="input w-full"
                  type="text"
                  v-model="edited_user.nickname"
                  :placeholder="
                    edited_user.nickname
                      ? 'Ingrese el nombre de usuario'
                      : getWord({file:'lang',word:'none',lang})
                  "
                />
              </div>
            </div>
          </div>

          <div>
            <label for="name" class="block select-none text-xs">{{getWord({file:'user',word:'name',lang})}}</label>
            <input
              id="name"
              class="input"
              type="text"
              v-model="edited_user.name"
            />
          </div>

          <div>
            <label for="middle_name" class="block select-none text-xs"
              >{{getWord({file:'user',word:'middle_name',lang})}}</label
            >
            <input
              id="middle_name"
              class="input"
              type="text"
              v-model="edited_user.middle_name"
              :placeholder="
                !edited_user.middle_name
                  ? getWord({file:'lang',word:'none',lang})
                  : 'Ingrese el segundo nombre'
              "
            />
          </div>
          <div>
            <label for="surname" class="block select-none text-xs"
              >{{getWord({file:'user',word:'surname',lang})}}</label
            >
            <input
              id="surname"
              class="input"
              type="text"
              v-model="edited_user.surname"
            />
          </div>

          <div>
            <label for="second_surname" class="block select-none text-xs"
              >{{getWord({file:'user',word:'second_surname',lang})}}</label
            >
            <input
              id="second_surname"
              class="input"
              type="text"
              v-model="edited_user.second_surname"
              :placeholder="
                !edited_user.second_surname
                  ? getWord({file:'lang',word:'none',lang})
                  : 'Ingrese el segundo apellido'
              "
            />
          </div>
          <div class=" col-span-2 mt-">
            <label for="email" class="block select-none text-xs">{{getWord({file:'user',word:'email',lang})}}</label>
            <input
              id="email"
              class="input w-full"
              type="email"
              v-model="edited_user.email"
              :placeholder="
                !edited_user.email ? getWord({file:'lang',word:'none',lang}) : 'Ingrese el segundo apellido'
              "
            />
          </div>
        </div>

        <div class="flex justify-center mb-2 col-span-2 mt-5 ">
          <router-link
          :to="{ name: 'UserConsultations', params: { nickname: user.nickname } }"
            class="px-3 py-0.5 min-w-max text-sm font-semibold rounded-md transition-colors hover:bg-indigo-200 hover:text-blue-900 cursor-pointer"
          >
            {{getWord({file:'user',word:'consultations_history',lang})}}
          </router-link>
        </div>

        <div class="flex justify-between mt-3 gap-2">
          <button
            @click="saveChanges()"
            :disabled="!wasEdited"
            :class="wasEdited ? 'btn-success' : 'btn-disabled'"
            class="text-sm mt-1 px-3 flex items-center"
          >
            <span class="mt-0.5">{{getWord({file:'lang',word:'save',lang})}}</span>
          </button>

          <button
            @click="removeUser()"
            class="btn-danger text-sm mt-1 pt-0.5 px-3 flex items-center"
          >
            <span class="material-icons text-md mr-1">warning</span>
            <span class="mt-0.5">{{getWord({file:'user',word:'take_down',lang})}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { confirmModal, showAlert } from "@/utils/alerts.js";
import { getWord } from "@/utils/lang";

export default {
  name: "User",
  data: function() {
    return {
      edited_user: {
        avatar: "01-man.svg",
        name: "Esperando datos",
        middle_name: "Esperando datos",
        surname: "Esperando datos",
        email: "Esperando datos",
        nickname: "Esperando datos",
      },
    };
  },
  created() {
    this.getUserByNickname(this.$route.params.nickname).then(() => {
      if (
        "id" in this.user &&
        this.user.nickname == this.$route.params.nickname
      ) {
        this.edited_user = { ...this.user };
        this.edited_user.id = parseInt(this.edited_user.id);
      }
    });
  },
  computed: {
    ...mapState({
      user: (state) => state.users.user,
      lang: (state) => state.lang,
    }),
    wasEdited() {
      return (
        this.user.name != this.edited_user.name ||
        this.user.middle_name != this.edited_user.middle_name ||
        this.user.surname != this.edited_user.surname ||
        this.user.second_surname != this.edited_user.second_surname ||
        this.user.nickname != this.edited_user.nickname ||
        this.user.email != this.edited_user.email
      );
    },
  },
  methods: {
    ...mapActions(["deleteUser", "editUser", "getUserByNickname"]),
    validateData() {
      if (this.edited_user.name.length == 0) {
        showAlert({
          type: "error",
          message: `Debes ingresar un nombre`,
        });
        return false;
      } else if (this.edited_user.surname.length == 0) {
        showAlert({
          type: "error",
          message: `Debes ingresar un apellido`,
        });
        return false;
      } else if (this.edited_user.email.length == 0) {
        showAlert({
          type: "error",
          message: `Debes ingresar un email`,
        });
        return false;
      } else if (this.edited_user.nickname.length == 0) {
        showAlert({
          type: "error",
          message: `Debes ingresar un nombre de usuario`,
        });
        return false;
      } else {
        return true;
      }
    },
    removeUser() {
      confirmModal({
        function: this.deleteUser,
        second_function: this.changeModeToList,
        text: `<span class="text-white"><b>CI: ${this.user.ci}<br> ${this.user.name} ${this.user.surname}  </b> <br> ¿Dar de baja al usuario?</span>`,
        data: {
          user_id: parseInt(this.user.id),
          username: `${this.user.name} ${this.user.surname}`,
        },
      });
    },
    saveChanges() {
      if (this.validateData()) this.editUser(this.edited_user);
    },
    getWord
  },
};
</script>

<style>
.w-90per {
  width: 90%;
}
.input {
  @apply w-90per font-medium px-2 py-0.5 transition-all bg-opacity-0 focus:bg-opacity-10 hover:bg-opacity-10 bg-white rounded-md text-xl outline-none;
}
</style>
