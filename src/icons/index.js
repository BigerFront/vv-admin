/**
 *    ,           ,
 *   /             \
 *  ((__-^^-,-^^-__))
 *   `-_---' `---_-'
 *    <__|o` 'o|__>
 *       \  `  /
 *        ): :(
 *        :o_o:
 *         "-"   
 * 
 * Copyright (c) 2019 FCEV-LAB,Aventador-lab
 * E-mail :FCEV.lab@gmail.com
 * git@work:BigerFront/vv-admin.git
 * 
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon',SvgIcon)

const req = require.context('./svg',false,/\.svg$/) //webpack