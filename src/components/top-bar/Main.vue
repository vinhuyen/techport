<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="" class="-intro-x hidden md:flex">
        <img
          alt="theLogo"
          class="w-40 "
          src="/theLogo.png"
        />
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto breadcrumb breadcrumb-light text-lg">
        Mạch lạc quy trình, định hình đẳng cấp
      </nav>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Notifications -->
      <Dropdown class="intro-x mr-4 sm:mr-6">
        <DropdownToggle
          tag="div"
          role="button"
          class="notification notification--bullet cursor-pointer"
        >
          <BellIcon class="notification__icon dark:text-slate-500" />
        </DropdownToggle>
        <DropdownMenu class="notification-content pt-2">
          <DropdownContent tag="div" class="notification-content__box">
            Your have request, please confirm
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <Dropdown class="intro-x w-8 h-8">
        <DropdownToggle
          tag="div"
          role="button"
          class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
        >
          <img
            alt="Icewall Tailwind HTML Admin Template"
            src="/src/assets/images/avatar-faker.jpg"
          />
        </DropdownToggle>
        <DropdownMenu class="w-56">
          <DropdownContent
            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
          >
            <DropdownHeader tag="div" class="!font-normal">
              <div class="font-medium">
                techzener@techzen.vn
              </div>
              <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                Developer
              </div>
            </DropdownHeader>
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5">
              <UserIcon class="w-4 h-4 mr-2" /> Profile</DropdownItem
            >
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem class="dropdown-item hover:bg-white/5">
              <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout</DropdownItem
            >
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script setup>
import { ref } from "vue";

const searchDropdown = ref(false);
</script>
