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
exports.notEmpty = name => {
  return v => {
    if(!v || v.trim === '') {
      return `${name} is required`
    }else{
      return true
    }
  }
}
