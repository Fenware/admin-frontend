<template>
  <div class="antialiased sans-serif text-white">
    <form @submit.prevent="nextStep()" class="">
      <div class="max-w-3xl mx-auto px-4 py-10">
        <!-- <div v-show.transition="step === 'complete'"> -->
        <div v-show="step === 'complete'">
          <div class="rounded-lg p-10 flex items-center justify-between">
            <div>
              <h2 class="text-2xl mb-4 text-gray-300 text-center font-bold">
                Registro exitoso
              </h2>

              <div class="text-white mb-8">
                Thank you. We have sent you an email to demo@demo.test. Please
                click the link in the message to activate your account.
              </div>

              <button
                class="btn-info text-md px-4 py-1 block mx-auto"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>

        <div v-show="step != 'complete'">
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
                    class="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
                    :style="
                      'width: ' + parseInt((step / steps_amount) * 100) + '%'
                    "
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
          <div class="py-10">
            <div class="grid grid-cols-2 gap-5" v-if="step === 1">
              <div class="">
                <label for="firstname" class="font-medium text-sm mb-1 block"
                  >Primer nombre *</label
                >
                <input
                  id="firstname"
                  v-model="user.firstname"
                  type="text"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese su nombre..."
                  required
                />
              </div>

              <div>
                <label for="middle_name" class="font-medium text-sm mb-1 block"
                  >Segundo nombre</label
                >
                <input
                  id="middle_name"
                  v-model="user.middle_name"
                  type="text"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese su segundo nombre..."
                />
              </div>

              <div class="">
                <label for="surname" class="font-medium text-sm mb-1 block"
                  >Primer apellido *</label
                >
                <input
                  id="surname"
                  v-model="user.surname"
                  type="text"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese su apellido..."
                  required
                />
              </div>

              <div class="">
                <label
                  for="second_surname"
                  class="font-medium text-sm mb-1 block"
                  >Segundo apellido</label
                >
                <input
                  id="second_surname"
                  v-model="user.second_surname"
                  type="text"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese su segundo apellido..."
                />
              </div>

              <span
                class="mt-2 col-span-2 text-right  text-sm font-bold text-yellow-200"
                >* campos obligatorios</span
              >
            </div>
            <!-- ------------------------------------------- -->
            <div class="grid grid-cols-2 gap-5" v-if="step === 2">
              <div class="">
                <label for="ci" class="font-medium text-sm mb-1 block"
                  >Cédula de identidad</label
                >
                <input
                  id="ci"
                  v-model="user.ci"
                  type="number"
                  max="99999999"
                  min="10000000"
                  required
                  pattern="^(0|[1-9][0-9]*)$"
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese su cédula de identidad..."
                />
                <span class="text-xs leading-3 pl-1"
                  >* Sín puntos ni guiones. Ej: 56478622</span
                >
              </div>

              <div class="">
                <label for="code" class="font-medium text-sm mb-1 block"
                  >Código de grupo</label
                >
                <input
                  id="code"
                  v-model="user.group_code"
                  type="text"
                  required
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese el codigo del grupo..."
                />
                <span class="text-xs leading-3 pl-1"
                  >Código de grupo que le porporcionó el administrador</span
                >
              </div>
            </div>
            <!-- -------------------------------------------  -->

            <div v-if="step === 3">
              <div class="mb-5">
                <label for="nickname" class="font-medium text-sm mb-1 block"
                  >Nombre de usuario</label
                >
                <input
                  id="nickname"
                  v-model="user.nickname"
                  type="text"
                  minlength="4"
                  required
                  autocomplete="off"
                  class="form-input w-1/2"
                  placeholder="Ingrese su nickname..."
                />
              </div>
              <div class="">
                <label for="email" class="font-medium text-sm mb-1 block"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="user.email"
                  type="email"
                  minlength="4"
                  required
                  autocomplete="off"
                  class="form-input w-3/4"
                  placeholder="Ingrese su correo electrónico..."
                />
              </div>
            </div>

            <!-- -------------------------------------------  -->
            <div class="grid grid-cols-2 gap-5" v-if="step === 4">
              <div class="">
                <label for="password" class="font-medium text-sm mb-1 block"
                  >Contraseña</label
                >
                <input
                  id="password"
                  v-model="user.password"
                  type="password"
                  minlength="6"
                  required
                  autocomplete="off"
                  class="form-input"
                  placeholder="Ingrese una contraseña..."
                />

                <ul class="text-xs mt-1">
                  <li>
                    * Mínimo 6 caracteres
                  </li>
                </ul>
              </div>
              <div class="">
                <label for="password" class="font-medium text-sm mb-1 block"
                  >Confirmar contraseña</label
                >
                <div class="flex items-center">
                  <input
                    id="confirm_password"
                    v-model="user.confirm_password"
                    type="password"
                    minlength="6"
                    required
                    autocomplete="off"
                    class="form-input"
                    :class="
                      user.password == user.confirm_password &&
                      user.password != ''
                        ? 'ring-2 ring-green-500'
                        : ''
                    "
                    placeholder="Repita la contraseña..."
                  />
                  <span
                    class="material-icons ml-2 text-3xl text-green-500 transition-all"
                    :class="
                      user.password == user.confirm_password &&
                      user.password != ''
                        ? 'opacity-100'
                        : 'opacity-0'
                    "
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
      <div class="py-5" v-show="step != 'complete'">
        <div class="max-w-3xl mx-auto px-4">
          <div class="flex justify-between">
            <div class="w-1/2 flex">
              <a
                v-show="step > 1"
                @click.prevent="previusStep()"
                class="btn-warning flex items-center pr-5 pl-3 py-1.5"
              >
                <span class=" mr-2 material-icons text-lg">
                  arrow_back
                </span>
                Paso anterior
              </a>
            </div>

            <div class="w-1/2 flex justify-end">
              <button
                v-show="step < steps_amount"
                class="btn-info pl-5 pr-3 py-1.5 flex items-center"
              >
                Siguiente
                <span class="material-icons text-lg ml-2">
                  arrow_forward
                </span>
              </button>

              <button
                v-show="step === steps_amount"
                class="btn-success px-5 py-1.5"
              >
                Completar registro
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- / Bottom Navigation https://placehold.co/300x300/e2e8f0/cccccc -->
    </form>
  </div>
</template>

<script>
export default {
  name: "UserRegistration",
  data: () => {
    return {
      step: 1,
      steps_amount: 4,
      passwordStrengthText: "",
      togglePassword: false,
      image: "",
      password: "",
      user: {
        /* ci: null, */
        ci: 52650714,
        nickname: "lucaspintos909",
        firstname: "Lucas",
        middle_name: "Mateo",
        surname: "Pintos",
        second_surname: "Fitipaldi",
        group_code: "YJ52YqUe",
        email: "lucaspintos909@gmail.com",
        password: "",
        confirm_password: "",
      },
    };
  },
  methods: {
    nextStep() {
      if (this.step == this.steps_amount) {
        this.step = "complete";
      } else if(this.step == "complete"){
        this.step = 1;
      } else{
        this.step += 1;
      }
    },
    previusStep() {
      this.step -= 1;
    },
  },
};
</script>

<style>
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
</style>
