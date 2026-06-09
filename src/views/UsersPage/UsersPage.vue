<template>
  <main-master-page>
    <div class="users-container">
      <table v-if="usersList?.length" class="users-table">
        <tr class="grid-header">
          <th>{{ $t('pages.users.fields.email') }}</th>
          <th v-for="(rule, ruleId) in usersList[0].permissions" :key="ruleId">
            {{ $t(`pages.users.fields.${ruleId}`) }}
          </th>
        </tr>
        <user-item v-for="user in usersList" :key="user.id" :user="user" />
      </table>
      <div v-else class="empty-message">No users found</div>
    </div>
  </main-master-page>
</template>

<script setup>
import MainMasterPage from '@/layout/MainMasterPage.vue'
import { onMounted } from 'vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
const usersStore = useUsersStore()
const { usersList } = storeToRefs(usersStore)
const { loadUsersList } = usersStore

onMounted(() => {
  loadUsersList()
})

import UserItem from './UserItem.vue'
</script>

<style lang="scss" scoped>
.users-container {
  max-width: 1200px;
  margin: 32px auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h1 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .users-table {
    display: flex;
    flex-direction: column;
    gap: 1px;
    /* Відстань між рядками */
    background-color: #e0e0e0;
    /* Фон для імітації меж між рядками */
  }

  .grid-header {
    display: grid;
    grid-template-columns: 300px repeat(4, 100px);
    /* Точно відповідає UserItem.vue */
    background-color: #3498db;
    color: white;
    padding: 12px 0;
    /* Прибираємо горизонтальний padding для точного вирівнювання */
    border-radius: 4px 4px 0 0;
    font-weight: 500;

    tr {
      display: grid;
      grid-template-columns: 300px repeat(4, 100px);

      /* Точно відповідає grid-header */
      th {
        text-align: center;
        border-right: 1px solid rgba(255, 255, 255, 0.3);
        padding: 0;
        /* Прибираємо padding, щоб стовпці вирівнялися */
        padding: 8px 0;
        /* Прибираємо горизонтальний padding */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 40px;

        line-height: 1.5;

        /* Для кращого вирівнювання тексту */
        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .empty-message {
    text-align: center;
    color: #7f8c8d;
    font-size: 1.2rem;
    padding: 16px;
  }

  @media (max-width: 768px) {
    margin: 16px;
    padding: 16px;

    h1 {
      font-size: 1.5rem;
    }

    .grid-header {
      grid-template-columns: 200px repeat(4, 80px);
      font-size: 0.9rem;
    }
  }

  @media (max-width: 600px) {
    .grid-header {
      display: none;
    }
  }
}
</style>
