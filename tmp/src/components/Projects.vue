<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getRepositories, type Repository } from '../service'
import Loading from './Loading.vue'

const isLoading = ref<boolean>(false);
const repositories = ref<Repository[]>();

const fn = (name: string): void => {
  window.open(`https://viniciusteixeiradias.github.io/${name}/`)
}

const loadRepositories = async (): Promise<void> => {
  try {
    isLoading.value = true
    
    const data = await getRepositories()

    repositories.value = [...data];
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadRepositories)
</script>

<template>
  <Loading v-if="isLoading" />
  <div v-else class="projects" >
    <h3>This website is still being developed. Initially it only contains quick access to my projects:</h3>
    
    <button 
      v-for="repo in repositories"
      :key="repo.id"
      @click="fn(repo.name)"
    >
      {{ repo.name }}
    </button>

    <p>
      Some projects were not possible to host here and other projects may not fully function as they rely on accessing an API, and GitHub does not host APIs.<br>
      However, you can head over to my <a href="https://github.com/viniciusteixeiradias" target="_blank">GitHub</a> to download the project and run the API locally.<br>
      This way, you will be able to experience all the functionalities properly.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  color: white;
  background-color: rgb(25, 20, 20);
  border: none;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgb(76, 70, 70);
  }
}

h1, h3, p {
  color: white;
}

a {
  color: rgb(200, 200, 255);
}
</style>
