import { useEffect, useState } from "react"
import type { SalesResult } from "../../../types/sales"
import Style from "./salesFormEdit.module.css"
import api from "../../../service/api"
import { toast } from "react-toastify"
import { ButtonLoading } from "../../load/ButtonLoading"
import axios from "axios"
import { IoClose } from "react-icons/io5"

export function SalesFormEdit({
  sale,
  displayModal,
  onClose,
  onUpdated
}: {
  sale: SalesResult
  displayModal: boolean
  onClose: () => void
  onUpdated?: () => Promise<void> | void
}) {

  const [status, setStatus] = useState("")
  const [trackingCode, setTrackingCode] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sale) {
      setStatus(sale.status)
      setTrackingCode((sale as SalesResult).trackingCode || "")
    }
  }, [sale])

  if (!displayModal) return null

  const calculatedTotal = sale.products.reduce((sum, product) => {
    const parsedPrice =
      typeof product.price === "string"
        ? Number.parseFloat(product.price)
        : Number(product.price);

    return sum + (Number.isNaN(parsedPrice) ? 0 : parsedPrice);
  }, 0);

  const displayTotal = Number(sale.total) > 0 ? Number(sale.total) : calculatedTotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.put(`/sales/update`, {
        id: sale.id,
        status,
        trackingCode
      })

      toast.success("Venda atualizada com sucesso!")
      await onUpdated?.()
      onClose()
    }catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || error.message);
  } else {
    toast.error("Erro inesperado");
  }
} finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={Style.FormEditModal}
      onClick={onClose}
    >
      <span className={Style.closeFormSales} onClick={onClose}>
        <IoClose />
      </span>
      <form className={Style.forEditSales} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Editar venda</h3>


        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pendente</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </label>


        <label>
          Código de rastreio
          <input
            type="text"
            placeholder="Ex: BR1234567890"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
          />
        </label>


        <label>
          Cliente
          <input type="text" value={sale.user?.name} readOnly />
        </label>

        <div className={Style.detailsBlock}>
          <span>Produtos do pedido</span>
          <div className={Style.productsList}>
            {sale.products.map((p) => (
              <div key={p.id} className={Style.productItem}>
                <strong>{p.name}</strong>
                <span>
                  {Number(p.price).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <label>
          Total:
          <input
            type="text"
            disabled
            value={displayTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          />
        </label>

        <ButtonLoading
          loading={loading}
          text="Salvar alterações"
          className={Style.buttonEdit}
        />
      </form>
    </div>
  )
}
