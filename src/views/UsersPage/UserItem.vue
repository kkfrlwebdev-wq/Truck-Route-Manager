<template>
  <tr>
    <td>{{ user.email }}</td>
    <td v-for="(rule, ruleId) in editablePermissionsList()" :key="ruleId">
      <input v-model="userObj.permissions[ruleId]" type="checkbox" class="checkbox" />
    </td>
  </tr>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useUsersStore } from '@/stores/users'
const userStore = useUsersStore()

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const userObj = reactive({ ...props.user })
const editablePermissions = ['read', 'create', 'update', 'delete']

function editablePermissionsList() {
  const obj = {}
  for (const ruleId of editablePermissions) {
    obj[ruleId] = userObj.permissions[ruleId]
  }
  return obj
}

watch(userObj, (newUserObj) => {
  userStore.updateUser({
    id: newUserObj.id,
    data: {
      email: newUserObj.email,
      permissions: newUserObj.permissions
    }
  })
})
</script>

<style lang="scss" scoped>
tr {
  display: grid;
  grid-template-columns: 300px repeat(4, 100px); /* Точно відповідає grid-header */
  align-items: center;
  padding: 12px 0; /* Прибираємо горизонтальний padding для точного вирівнювання */
  background-color: #f5f6fa;
  border-radius: 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e8ecef;
  }

  td {
    text-align: center;
    font-weight: 500;
    color: #2c3e50;
    border-right: 1px solid #e0e0e0;
    padding: 8px 0; /* Прибираємо горизонтальний padding */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40px; /* Для однакової висоти рядків */

    &:last-child {
      border-right: none;
    }

    &.permissions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;

      .checkbox {
        width: 16px;
        height: 16px;
        cursor: pointer;
        accent-color: #3498db;
      }
    }
  }
}

@media (max-width: 768px) {
  tr {
    grid-template-columns: 200px repeat(4, 80px);
    font-size: 0.9rem;

    td.permissions {
      gap: 8px;
    }
  }
}

@media (max-width: 600px) {
  tr {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;

    td {
      border-right: none;
      border-bottom: 1px solid #e0e0e0;
      padding: 8px 0;
      width: 100%;

      &:last-child {
        border-bottom: none;
      }

      &.permissions {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
