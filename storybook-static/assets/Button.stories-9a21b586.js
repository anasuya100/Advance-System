import{j as r}from"./clsx-ad8f5877.js";import{B as e}from"./Button-82637ab6.js";import{r as n}from"./index-8a57d176.js";import"./_commonjsHelpers-725317a4.js";function A({title:t,titleId:a,...u},m){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:m,"aria-labelledby":a},u),t?n.createElement("title",{id:a},t):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"}))}const F=n.forwardRef(A),h=F;function P({title:t,titleId:a,...u},m){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:m,"aria-labelledby":a},u),t?n.createElement("title",{id:a},t):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"}))}const M=n.forwardRef(P),x=M,$={title:"Components/Button",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","success","warning","error","info","ghost","outline"]},size:{control:"select",options:["xs","sm","md","lg","xl"]},disabled:{control:"boolean"},loading:{control:"boolean"},fullWidth:{control:"boolean"}}},o={args:{children:"Button"}},s={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-3",children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"success",children:"Success"}),r.jsx(e,{variant:"warning",children:"Warning"}),r.jsx(e,{variant:"error",children:"Error"}),r.jsx(e,{variant:"info",children:"Info"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"outline",children:"Outline"})]})},i={render:()=>r.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[r.jsx(e,{size:"xs",children:"Extra Small"}),r.jsx(e,{size:"sm",children:"Small"}),r.jsx(e,{size:"md",children:"Medium"}),r.jsx(e,{size:"lg",children:"Large"}),r.jsx(e,{size:"xl",children:"Extra Large"})]})},l={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-3",children:[r.jsx(e,{leftIcon:r.jsx(x,{className:"w-4 h-4"}),children:"Add Item"}),r.jsx(e,{rightIcon:r.jsx(h,{className:"w-4 h-4"}),children:"Download"}),r.jsx(e,{leftIcon:r.jsx(x,{className:"w-4 h-4"}),rightIcon:r.jsx(h,{className:"w-4 h-4"}),children:"Both Icons"})]})},c={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-3",children:[r.jsx(e,{children:"Normal"}),r.jsx(e,{disabled:!0,children:"Disabled"}),r.jsx(e,{loading:!0,children:"Loading"})]})},d={render:()=>r.jsx("div",{className:"w-64",children:r.jsx(e,{fullWidth:!0,children:"Full Width Button"})})};var p,B,g;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(g=(B=o.parameters)==null?void 0:B.docs)==null?void 0:g.source}}};var f,w,v;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">\r
      <Button variant="primary">Primary</Button>\r
      <Button variant="secondary">Secondary</Button>\r
      <Button variant="success">Success</Button>\r
      <Button variant="warning">Warning</Button>\r
      <Button variant="error">Error</Button>\r
      <Button variant="info">Info</Button>\r
      <Button variant="ghost">Ghost</Button>\r
      <Button variant="outline">Outline</Button>\r
    </div>
}`,...(v=(w=s.parameters)==null?void 0:w.docs)==null?void 0:v.source}}};var j,I,N;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3">\r
      <Button size="xs">Extra Small</Button>\r
      <Button size="sm">Small</Button>\r
      <Button size="md">Medium</Button>\r
      <Button size="lg">Large</Button>\r
      <Button size="xl">Extra Large</Button>\r
    </div>
}`,...(N=(I=i.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var S,E,b;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">\r
      <Button leftIcon={<PlusIcon className="w-4 h-4" />}>Add Item</Button>\r
      <Button rightIcon={<ArrowDownIcon className="w-4 h-4" />}>Download</Button>\r
      <Button leftIcon={<PlusIcon className="w-4 h-4" />} rightIcon={<ArrowDownIcon className="w-4 h-4" />}>\r
        Both Icons\r
      </Button>\r
    </div>
}`,...(b=(E=l.parameters)==null?void 0:E.docs)==null?void 0:b.source}}};var y,z,W;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">\r
      <Button>Normal</Button>\r
      <Button disabled>Disabled</Button>\r
      <Button loading>Loading</Button>\r
    </div>
}`,...(W=(z=c.parameters)==null?void 0:z.docs)==null?void 0:W.source}}};var D,L,k;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="w-64">\r
      <Button fullWidth>Full Width Button</Button>\r
    </div>
}`,...(k=(L=d.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};const G=["Default","Variants","Sizes","WithIcons","States","FullWidth"];export{o as Default,d as FullWidth,i as Sizes,c as States,s as Variants,l as WithIcons,G as __namedExportsOrder,$ as default};
