# 整合 JSON Schema 到 Chakra UI、React Hook Form、Yup

## 套件

- [React JSON Schema Form](@rjsf/core)
- [Chakra UI]
- [React Hook Form]
- [Yup]

## 說明

- React JSON Schema Form + Chakra UI
  - 安裝 @rjsf/chakra-ui
- Chakra UI + React Hook Form
  - 官網範例 https://chakra-ui.com/getting-started/with-hook-form
- React Hook Form + Yup

  - 官網範例

    ```jsx
    import { yupResolver } from '@hookform/resolvers/yup';
    import { useForm } from 'react-hook-form';
    import * as yup from 'yup';

    const schema = yup
      .object({
        firstName: yup.string().required(),
        age: yup.number().positive().integer().required(),
      })
      .required();

    export default function App() {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = data => console.log(data);

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('firstName')} />
          <p>{errors.firstName?.message}</p>

          <input {...register('age')} />
          <p>{errors.age?.message}</p>

          <input type="submit" />
        </form>
      );
    }
    ```


## 討論

- React JSON Schema Form 是最完整的，且有支援 Chakra UI，但還在觀察支援的程度。
- JSON Schema 和 Yup 可能並不能完全對應，例如 `type: 'string'` 和 `type: 'number'`，Yup 只有 `string()` 和 `number()`，沒有 `integer()`。
  - 參考套件 schema-to-yup：從 JSON Schema 創建 Yup 驗證
    - star 數：273
    - 週下載數：29,382