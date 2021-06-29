<template>
  <div class="container">
    <h1>Materias</h1>
    <div class="content">
      <form class="form-input">
        <input type="text" placeholder="Buscar materia" required />
        <input
          type="button"
          value="Buscar"
          class=""
          placeholder="Buscar"
          required
        />
      </form>

      <div class="add-subject-form bg-glass">
        <form class="form-input">
          <input type="text" placeholder="Nombre de la materia" required />
          <input type="button" value="Agregar" placeholder="Buscar" required />
        </form>
      </div>
      <div class="bg-glass subjects-parent">
        <div class="subjects">
          <div
            v-for="subject in subjects"
            :key="subject.id"
            class="subject-card"
          >
            <input
              :id="subject.id"
              type="text"
              :value="subject.name"
              disabled
            />
            <div class="card-buttons">
              <button
                @click="saveNewSubjectName(subject.id)"
                :id="subject.id + 'btn_save'"
                class="btn btn-save invisible"
              >
                Guardar
              </button>
              <button
                @click="editSubjectInput(subject.id)"
                :id="subject.id + 'btn_edit'"
                class="btn btn-warning"
              >
                Editar
              </button>
              <button :id="subject.id + 'btn_delete'" class="btn btn-danger">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Materias",
  computed: {
    ...mapState(["subjects"]),
  },
  methods: {
    ...mapMutations(["changeSubjectName"]),
    saveNewSubjectName(id) {
      let newSubjectName = document.getElementById(id).value;
      let subjectInput = document.getElementById(id);
      let editButton = document.getElementById(id + "btn_edit");
      let saveButton = document.getElementById(id + "btn_save");

      let subject = {
        id: id,
        name: newSubjectName
      }
      this.changeSubjectName(subject);
      editButton.classList.remove("invisible");
      saveButton.classList.add("invisible");
      subjectInput.classList.remove("input-enable");
      subjectInput.disabled = true;

    },
    editSubjectInput(id) {
      let subjectInput = document.getElementById(id);
      let editButton = document.getElementById(id + "btn_edit");
      let saveButton = document.getElementById(id + "btn_save");

      editButton.classList.add("invisible");
      saveButton.classList.remove("invisible");

      subjectInput.classList.add("input-enable");
      subjectInput.disabled = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.container {
  color: #fff;
  height: 100%;
}
h1 {
  font-size: 2.2rem;
  text-align: center;
  margin-top: 0.8rem;
}
.content {
  padding: 2rem 5%;
  height: 75vh;
}
.form-input {
  display: flex;
  input:hover,
  input[type="text"]:focus,
  input[type="button"]:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 4px 4px 20px 8px rgba(0, 0, 0, 0.2);
  }

  input:active,
  input[type="text"]:focus,
  input[type="submit"]:focus {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 4px 4px 15px 8px rgba(255, 255, 255, 0.2);
    outline: none;
  }
}
.form-input input {
  width: 85%;
  height: 100%;
  padding: 1.2rem 2rem;
  font-size: 1.4rem;
  color: #fff;
  border: 0;
  border-radius: 1.3rem;
  box-sizing: border-box;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  &[type="button"] {
    width: 15%;
    margin-left: 2rem;
  }
  &[type="button"]:hover {
    cursor: pointer;
  }
}

.form-input input::placeholder {
  color: white;
  transition: 0.3s;
}

.form-input input:focus::placeholder {
  opacity: 0;
}

.add-subject-form {
  margin-top: 4rem;
  padding: 2rem;
}
.subjects-parent {
  overflow: auto;
  box-sizing: border-box;
  height: 45vh;
  margin-top: 4rem;
}
.subjects {
  overflow: auto;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}
.subject-card {
  margin: 1.5rem;
  font-size: 1.6rem;
  padding: .8rem 1.5rem;

  background-color: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(2.5rem);
  backdrop-filter: blur(2.5rem);
  border-radius: 1.2rem;

  -webkit-box-shadow: 0px 0px 20px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 20px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 20px -6px rgba(0, 0, 0, 0.75);
  .card-buttons {
    display: flex;
    justify-content: space-evenly;
    margin: 1rem .5rem .5rem;
    .btn {
      padding: 0.5rem 2rem;
      font-size: 1.4rem;
      color: #fff;
      border: none;
      border-radius: 1.5rem;
      box-sizing: border-box;
      outline: none;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .btn-warning {
      background-color: rgba(61, 132, 184, 0.5);
      transition: all 0.1s ease;
      &:hover {
        background-color: rgba(61, 132, 184, 1);
      }
    }
    .btn-danger {
      background-color: rgba(219, 78, 103, 0.5);
      transition: all 0.3s ease;
      &:hover {
        background-color: rgba(219, 78, 103, 1);
      }
    }
    .btn-save {
      background-color: rgba(53, 115, 118, 0.5);
      transition: all 0.3s ease;
      &:hover {
        background-color: rgba(53, 115, 118, 1);
      }
    }
  }
  .subject-id {
    display: none;
  }
  input {
    color: #fff;
    background-color: transparent;
    font-size: 1.6rem;
    border: 0;
  }
  .input-enable {
    padding: 0.2rem 0.4rem;
    background-color: rgba(255, 255, 255, 0.1);
    -webkit-backdrop-filter: blur(2.5rem);
    backdrop-filter: blur(2.5rem);
    border-radius: 1.2rem;
    outline: none;
    -webkit-box-shadow: 0px 0px 20px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 20px -6px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 20px -6px rgba(0, 0, 0, 0.75);
  }
  .invisible {
    display: none;
  }
}
</style>
