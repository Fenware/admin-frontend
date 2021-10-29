<template>
  <div class="antialiased sans-serif text-white h-full">
    <form
      class="flex flex-col justify-between h-full"
      @submit.prevent="nextStep()"
    >
      <div class="w-full mx-auto px-5 py-5">
        <!-- <div v-show.transition="step === 'complete'"> -->
        <div v-if="step === 'complete'">
          <div class="rounded-lg p-10 flex items-center justify-center">
            <div>
              <h2 class="text-2xl mb-4 text-center font-bold">
                Registro exitoso
              </h2>

              <div class="text-white text-center my-8">
                Thank you. We have sent you an email to demo@demo.test. Please
                click the link in the message to activate your account.
              </div>

              <div class="flex justify-around mt-10">
                <router-link
                  :to="{ name: 'Users' }"
                  type="button"
                  class="btn-info text-md px-4 py-1 mx-auto"
                >
                  Volver a sección de usuarios
                </router-link>
                <router-link
                  :to="{ name: 'User', params: { nickname: user.nickname } }"
                  class="btn-success text-md px-4 py-1 mx-auto"
                >
                  Ver usuario creado
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div v-show="step !== 'complete'">
          <!-- Top Navigation -->

          <div class="border-b-2 pt-4 pb-3">
            <div
              class="uppercase tracking-wide text-xs font-bold text-indigo-400 mb-1 leading-tight"
            >
              <span>Paso: {{ step }} de 4</span>
            </div>
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div class="flex-1">
                <div v-show="step === 1">
                  <div class="text-xl font-bold leading-tight">
                    Datos personales
                  </div>
                </div>

                <div v-show="step === 2">
                  <div class="text-xl font-bold leading-tight">
                    Unir a grupo
                  </div>
                </div>

                <div v-show="step === 3">
                  <div class="text-lg font-bold leading-tight">
                    Perfil de usuario
                  </div>
                </div>

                <div v-show="step === 4">
                  <div class="text-lg font-bold leading-tight">
                    Seguridad de la cuenta
                  </div>
                </div>
              </div>

              <div class="flex items-center md:w-64">
                <div class="w-full bg-white bg-opacity-80 rounded-full mr-2">
                  <div
                    :style="
                      'width: ' + parseInt((step / steps_amount) * 100) + '%'
                    "
                    class="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
                  ></div>
                </div>
                <span class="text-xs tracking-wider w-10 text-gray-300">
                  <!-- {{ parseInt(((step - 1) / steps_amount) * 100) + "%" }} -->
                  {{ step + "/" + steps_amount }}
                </span>
              </div>
            </div>
          </div>
          <!-- /Top Navigation -->

          <!-- Step Content -->
          <div class="max-w-5xl mx-auto py-10">
            <div
              v-if="step === 1"
              class="grid grid-cols-2 gap-5 justify-center"
            >
              <div class="">
                <label class="font-medium text-sm mb-1 block" for="firstname"
                  >Primer nombre *</label
                >
                <input
                  id="firstname"
                  v-model="user.name"
                  autocomplete="off"
                  class="input"
                  placeholder="Ingrese su nombre..."
                  required
                  type="text"
                />
              </div>

              <div>
                <label class="font-medium text-sm mb-1 block" for="middle_name"
                  >Segundo nombre</label
                >
                <input
                  id="middle_name"
                  v-model="user.middle_name"
                  autocomplete="off"
                  class="input"
                  placeholder="Ingrese su segundo nombre..."
                  type="text"
                />
              </div>

              <div class="">
                <label class="font-medium text-sm mb-1 block" for="surname"
                  >Primer apellido *</label
                >
                <input
                  id="surname"
                  v-model="user.surname"
                  autocomplete="off"
                  class="input"
                  placeholder="Ingrese su apellido..."
                  required
                  type="text"
                />
              </div>

              <div class="">
                <label
                  class="font-medium text-sm mb-1 block"
                  for="second_surname"
                  >Segundo apellido</label
                >
                <input
                  id="second_surname"
                  v-model="user.second_surname"
                  autocomplete="off"
                  class="input"
                  placeholder="Ingrese su segundo apellido..."
                  type="text"
                />
              </div>

              <span
                class="mt-2 col-span-2 text-right  text-sm font-bold text-yellow-200"
                >* campos obligatorios</span
              >
            </div>

            <!-- ------------------------------------------- -->
            <div v-if="step === 2" class="grid grid-cols-2 gap-5">
              <div class="relative">
                <label class="font-medium text-sm mb-1 block" for="ci"
                  >Cédula de identidad</label
                >
                <input
                  id="ci"
                  v-model="user.ci"
                  autocomplete="off"
                  class="input tracking-widest"
                  :class="
                    user.ci.toString().length === 8
                      ? ciIsTaken
                        ? 'ring-2 ring-red-500'
                        : 'ring-2 ring-green-500'
                      : user.ci.toString().length > 8
                      ? 'ring-2 ring-red-500'
                      : ''
                  "
                  max="99999999"
                  min="10000000"
                  pattern="^(0|[1-9][0-9]*)$"
                  placeholder="Ingrese su cédula de identidad..."
                  required
                  type="number"
                />
                <span class="text-xs leading-3 pl-1"></span>
                <transition name="fade" type="out-in">
                  <span class="mt-1 absolute text-xs" v-show="!ciIsTaken"
                    >* Sín puntos ni guiones. Ej: 56781234</span
                  >
                </transition>
                <transition name="fade" type="out-in">
                  <span
                    class="mt-1 absolute text-sm text-red-500 font-medium"
                    v-show="ciIsTaken && user.ci.toString().length > 0"
                    >La cédula ingresada ya esta tomada</span
                  >
                </transition>
              </div>

              <div>
                <label
                  class="font-medium text-center text-sm mb-1 block"
                  for="student"
                  >Tipo de usuario</label
                >
                <div class="flex justify-around pt-2">
                  <div class="flex gap-1 items-center">
                    <input
                      id="student"
                      v-model="user.type"
                      class="form-radio text-blue-600"
                      name="user_type"
                      required
                      type="radio"
                      value="student"
                    />
                    <label for="student">Estudiante</label>
                  </div>
                  <div class="flex gap-1 items-center">
                    <input
                      id="teacher"
                      v-model="user.type"
                      class="form-radio text-blue-600"
                      name="user_type"
                      required
                      type="radio"
                      value="teacher"
                    />
                    <label for="teacher">Docente</label>
                  </div>
                </div>
              </div>

              <div class="mt-5 relative">
                <label class="font-medium text-sm mb-1 block" for="code"
                  >Código de grupo</label
                >
                <input
                  id="code"
                  v-model="user.group"
                  :class="
                    user.type === 'teacher'
                      ? 'opacity-50 hover:bg-opacity-50'
                      : user.group !== ''
                      ? codeExists && user.type === 'student'
                        ? 'ring-2 ring-green-500'
                        : 'ring-2 ring-red-500'
                      : ''
                  "
                  :disabled="user.type === 'teacher' || user.type.length === 0"
                  autocomplete="off"
                  class="input w-2/3"
                  placeholder="Ingrese el codigo del grupo..."
                  required
                  type="text"
                />
                <transition name="fade" type="out-in">
                  <span
                    v-show="
                      user.type.length > 0 &&
                        (codeExists || this.user.group.length < 8)
                    "
                    :class="
                      user.type === 'teacher'
                        ? 'text-yellow-400 font-medium'
                        : ''
                    "
                    class="mt-1 absolute text-xs leading- pl-1"
                    >{{
                      user.type === "teacher"
                        ? "* El docente debe unirse a los grupos por cuenta propia"
                        : "Código de grupo que le porporcionó el administrador"
                    }}</span
                  >
                </transition>

                <transition name="fade" type="out-in">
                  <span
                    v-show="user.type.length === 0"
                    class="mt-1 absolute text-sm pl-1 text-yellow-400 font-medium"
                    >Debe seleccionar el tipo de usuario</span
                  >
                </transition>

                <transition name="fade" type="out-in">
                  <span
                    v-show="!codeExists && user.group.length >= 8"
                    class="mt-1  absolute text-sm font-medium pl-1 text-red-500"
                    >Código de grupo inválido</span
                  >
                </transition>
              </div>
            </div>

            <!-- -------------------------------------------  -->

            <div v-if="step === 3" class="flex items-center gap-5">
              <div class="w-1/4 mx-10">
                <img
                  :src="require('@/assets/avatars/' + user.avatar)"
                  alt="user_avatar"
                  class="w-90per mx-auto"
                />
                <button
                  class="mt-4 btn-info mx-auto block text-xs border-0"
                  type="button"
                  @click="this.$refs.theModal.openModal() /*openModal()*/"
                >
                  Cambiar avatar
                </button>
              </div>
              <div class="w-9/12">
                <div class="mb-10 ">
                  <label class="font-medium text-sm mb-1 block" for="nickname"
                    >Nombre de usuario</label
                  >
                  <div class="flex items-center gap-2 relative">
                    <input
                      id="nickname"
                      v-model="user.nickname"
                      :class="
                        !nicknameIsTaken
                          ? user.nickname !== ''
                            ? 'ring-2 ring-green-500'
                            : ''
                          : 'ring-2 ring-red-500'
                      "
                      autocomplete="off"
                      class="input max-w-sm"
                      minlength="4"
                      placeholder="Ingrese su nickname..."
                      required
                      type="text"
                    />
                    <span
                      v-if="!nicknameIsTaken && user.nickname !== ''"
                      class="material-icons text-green-500"
                      >check</span
                    >
                    <span
                      v-else-if="user.nickname !== ''"
                      class="material-icons text-red-500"
                      >close</span
                    >
                  </div>
                  <span
                    v-show="nicknameIsTaken"
                    class="absolute my-1 text-sm text-red-500 font-medium"
                    >El nombre de usuario ya esta tomado</span
                  >
                </div>
                <div class="relative">
                  <label class="font-medium text-sm mb-1 block" for="email"
                    >Email</label
                  >
                  <input
                    id="email"
                    v-model="user.email"
                    autocomplete="off"
                    class="input "
                    :class="emailIsTaken ? 'ring-2 ring-red-500' : ''"
                    minlength="4"
                    placeholder="Ingrese su correo electrónico..."
                    required
                    type="email"
                  />
                  <transition name="fade" type="out-in">
                    <span
                      class="mt-1 text-red-500 text-sm font-medium absolute"
                      v-show="emailIsTaken"
                    >
                      El email ingresado ya esta tomado
                    </span>
                  </transition>
                </div>
              </div>
            </div>

            <TheModal
              ref="theModal"
              closeButtonText="Seleccionar"
              title="Cambiar avatar"
            >
              <div class="my-10">
                <div class="flex justify-center flex-wrap gap-3 px-5 mt-2">
                  <button
                    v-for="avatar_data in avatars"
                    :id="avatar_data.id"
                    :key="avatar_data.id"
                    class="w-16 transition duration-200 ease-in-out hover:bg-opacity-20 focus:bg-opacity-30 transform bg-white rounded-xl bg-opacity-10 cursor-pointer"
                    type="button"
                    @click="selectAvatar(avatar_data.id)"
                  >
                    <img
                      :src="require('@/assets/avatars/' + avatar_data.file)"
                      alt="avatar"
                      class="max-h-14 my-3 mx-1"
                    />
                  </button>
                </div>
              </div>
            </TheModal>

            <!-- -------------------------------------------  -->
            <div v-if="step === 4" class="grid grid-cols-2 gap-5">
              <div class="">
                <label class="font-medium text-sm mb-1 block" for="password"
                  >Contraseña</label
                >
                <input
                  id="password"
                  v-model="user.password"
                  autocomplete="off"
                  class="input"
                  minlength="8"
                  placeholder="Ingrese una contraseña..."
                  required
                  type="password"
                />

                <ul class="text-xs mt-1">
                  <li>
                    * Mínimo 8 caracteres
                  </li>
                </ul>
              </div>
              <div class="">
                <label class="font-medium text-sm mb-1 block" for="password"
                  >Confirmar contraseña</label
                >
                <div class="flex items-center">
                  <input
                    id="confirm_password"
                    v-model="user.confirm_password"
                    :class="
                      user.password === user.confirm_password &&
                      user.password !== ''
                        ? 'ring-2 ring-green-500'
                        : user.confirm_password !== ''
                        ? 'ring-2 ring-red-500'
                        : ''
                    "
                    autocomplete="off"
                    class="input"
                    minlength="8"
                    placeholder="Repita la contraseña..."
                    required
                    type="password"
                  />
                  <span
                    :class="
                      user.password === user.confirm_password &&
                      user.password !== ''
                        ? 'opacity-100'
                        : 'opacity-0'
                    "
                    class="material-icons ml-2 text-3xl text-green-500 transition-all"
                    >check</span
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- / Step Content -->
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div v-show="step !== 'complete'" class="py-5 ">
        <div class="max-w-6xl mx-auto px-4 ">
          <div class="flex justify-between">
            <div class="w-1/2 flex">
              <a
                v-show="step > 1"
                class="btn-warning flex items-center pr-5 pl-3 py-1.5 select-none"
                @click.prevent="previusStep()"
              >
                <span class=" mr-2 material-icons text-lg">
                  arrow_back
                </span>
                Paso anterior
              </a>
            </div>

            <div class="w-1/2 flex justify-end">
              <!-- <button
                v-show="step < steps_amount"
                :class="step === 3 && nicknameIsTaken ? 'btn-disabled' : ''"
                :disabled="step === 3 && nicknameIsTaken"
                class="btn-info pl-5 pr-3 py-1.5 flex items-center select-none"
              >
                Siguiente
                <span class="material-icons text-lg ml-2">
                  arrow_forward
                </span>
              </button> -->

              <button
                v-show="step < steps_amount"
                :class="!validateDataByStep ? 'btn-disabled' : ''"
                :disabled="!validateDataByStep"
                class="btn-info pl-5 pr-3 py-1.5 flex items-center select-none"
              >
                Siguiente
                <span class="material-icons text-lg ml-2">
                  arrow_forward
                </span>
              </button>

              <div>
                <span> </span>
                <button
                  type="button"
                  id="create_user_button"
                  v-show="step === steps_amount"
                  class="btn-success px-5 py-1.5"
                  @click="create()"
                >
                  Completar registro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- / Bottom Navigation https://placehold.co/300x300/e2e8f0/cccccc -->
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheModal from "../components/TheModal";
/*import { showAlert } from "../utils/alerts";*/

export default {
  name: "UserRegistration",
  data: () => {
    return {
      step: 1,
      steps_amount: 4,
      togglePassword: false,
      selectedAvatar: null,
      user: {
        /* ci: null, */
        ci: "",
        nickname: "",
        name: "",
        middle_name: "",
        surname: "",
        second_surname: "",
        group: "",
        type: "",
        email: "",
        avatar: "01-man.svg",
        password: "",
        confirm_password: "",
      },
      avatars: [
        { id: 1, file: "01-man.svg" },
        { id: 2, file: "02-boy.svg" },
        { id: 3, file: "03-woman.svg" },
        { id: 4, file: "04-boy-1.svg" },
        { id: 5, file: "05-girl-1.svg" },
        { id: 6, file: "06-woman-3.svg" },
        { id: 7, file: "07-boy-2.svg" },
      ],
    };
  },
  components: {
    TheModal,
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      groups: (state) => state.groups.groups,
      registration_state: (state) => state.users.registration_state,
    }),
    nicknameIsTaken: function() {
      return this.users.find((user) => user.nickname === this.user.nickname);
    },
    emailIsTaken: function() {
      return this.users.find((user) => user.email === this.user.email);
    },
    ciIsTaken: function() {
      return this.users.find((user) => user.ci === this.user.ci.toString());
    },
    codeExists: function() {
      return this.groups.find((group) => group.code === this.user.group);
    },
    validateDataByStep: function() {
      let isOk = false;
      if (this.step === 3 && !this.nicknameIsTaken && !this.emailIsTaken) {
        isOk = true;
      }
      if (this.step === 2) {
        if (this.user.type == "student") {
          if (
            this.codeExists &&
            !this.ciIsTaken &&
            this.user.ci.toString().length === 8
          ) {
            isOk = true;
          }
        } else if (this.user.type == "teacher" && !this.ciIsTaken) {
          isOk = true;
        }
      }
      if (this.step === 1 || this.step === 4) {
        isOk = true;
      }

      return isOk;
    },
  },
  created() {
    if (this.users.length === 0) {
      this.getUsers();
    }
    this.getGroups();
  },
  methods: {
    ...mapActions(["getUsers", "createUser", "getGroups"]),
    nextStep() {
      if (this.step === this.steps_amount) {
        this.step = "complete";
      } else if (this.step === "complete") {
        this.step = 1;
      } else {
        this.step++;
      }
    },
    previusStep() {
      this.step--;
    },
    create() {
      if (this.validateData()) {
        let button = document.getElementById("create_user_button");
        button.disabled = true;
        button.classList.replace("btn-success", "btn-disabled");

        this.user.ci = this.user.ci.toString();
        this.createUser(this.user).then(() => {
          if (this.registration_state) {
            setTimeout(() => {
              button.disabled = false;
              button.classList.replace("btn-disabled", "btn-success");
            }, 1500);
            setTimeout(() => {
              this.nextStep();
            }, 2000);
          } else {
            setTimeout(() => {
              button.disabled = false;
              button.classList.replace("btn-disabled", "btn-success");
            }, 1500);
          }
        });
      } else {
        console.log("Datos invalidos");
      }
    },
    validateData() {
      let isOk = true;
      let keys = Object.keys(this.user);
      Object.values(this.user).forEach((element, index) => {
        if (
          element.toString() === "" &&
          keys[index] != "middle_name" &&
          keys[index] != "second_surname" && 
          (keys[index] === "type" && element === 'student') 
        ) {
          isOk = false;
        }
      });
      return isOk;
    },
    selectAvatar(id) {
      let selectedAvatar = document.getElementById(id);
      this.selectedAvatar = id;

      this.avatars.forEach((avatar) => {
        let avatarAny = document.getElementById(avatar.id);

        avatarAny.classList.remove("scale-110");
        avatarAny.classList.remove("bg-opacity-30");
        avatarAny.classList.add("hover:bg-opacity-20");

        if (avatar.id === id) {
          selectedAvatar.classList.remove("hover:bg-opacity-20");
          this.user.avatar = avatar.file;
        }
      });

      selectedAvatar.classList.add("scale-110");
      selectedAvatar.classList.add("bg-opacity-30");
    },
  },
};
</script>

<style scoped>
.input {
  @apply block w-full font-normal text-lg bg-white bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-30 transition-all outline-none rounded-lg px-2 py-2;
}

label {
  @apply select-none;
}

span {
  @apply select-none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
